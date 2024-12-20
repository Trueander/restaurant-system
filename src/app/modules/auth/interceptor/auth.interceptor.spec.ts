import {TestBed} from "@angular/core/testing";
import {AuthInterceptor} from "./auth.interceptor";
import {TokenService} from "../services/token.service";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {SweetAlertService} from "../../../shared/services/sweet-alert.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../../../environments/environment";

describe('AuthInterceptor', () => {
  let tokenService: jasmine.SpyObj<TokenService>;
  let sweetAlertService: jasmine.SpyObj<SweetAlertService>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: TokenService, useValue: jasmine.createSpyObj('TokenService', ['getToken', 'clearOnLogout']) },
        { provide: SweetAlertService, useValue: jasmine.createSpyObj('SweetAlertService', ['infoAlert']) },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ],
    });

    tokenService = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
    sweetAlertService = TestBed.inject(SweetAlertService) as jasmine.SpyObj<SweetAlertService>;
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should pass through the request if no token was provided', () => {
    //Arrange
    tokenService.getToken.and.returnValue(null);
    const urlLogin = `${environment.URL_BACKEND}/login`;
    const payloadLogin = {username: 'username', password: 'password'};

    //Act
    httpClient.post(urlLogin, payloadLogin).subscribe();

    //Assert
    const req = httpTestingController.expectOne(urlLogin);
    expect(req.request.headers.has('Authorization')).toBeFalse();

    req.flush(null);
  });

  it('should throw an error when token is expired', () => {
    //Arrange
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VySWQiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2ODMwNzM2OTcsImV4cCI6MTY5NTg4Mzc5N30.IoV5fqKjO3yNrwRUMmZqL7QsC-6Mi8G9wxJ5Jzdtg2E';
    tokenService.getToken.and.returnValue(token);
    const urlProducts = `${environment.URL_BACKEND}/api/products`;

    //Act
    httpClient.post(urlProducts, {}).subscribe({
      error: () => {},
    });

    //Assert
    expect(tokenService.clearOnLogout).toHaveBeenCalled();
    expect(sweetAlertService.infoAlert).toHaveBeenCalled();
  });

  it('should intercept the request if token was provided', () => {
    //Arrange
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VySWQiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2ODMwNzM2OTcsImV4cCI6MjA1MDA2MTkxNX0.AW5Ri95jFlGi_JVrjRV2cPVs1wPRVexfVlfETrkv5GQ';//token for 10 years

    tokenService.getToken.and.returnValue(token);
    const urlProducts = `${environment.URL_BACKEND}/api/products`;

    //Act
    httpClient.post(urlProducts, {}).subscribe();

    //Assert
    const req = httpTestingController.expectOne(urlProducts);
    expect(req.request.headers.has('Authorization')).toBeTrue();
  });
});
