import {LoginService} from "./login.service";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {LoginRequest} from "../models/login-request";

describe('LoginService', () => {
  let httpMock: HttpTestingController;
  let service: LoginService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LoginService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login and return the token in the response', (done: DoneFn) => {
    //Arrange
    const credentials: LoginRequest = { email: 'ander@gmail.com', password: '12345678' };
    const mockResponse = { token: 'token' };

    //Act
    service.login(credentials).subscribe(response => {
      expect(response).toEqual(mockResponse);
      done()
    });

    //Asert
    const req = httpMock.expectOne(`${service['baseUrlBackend']}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(credentials);

    req.flush(mockResponse);
  });
});
