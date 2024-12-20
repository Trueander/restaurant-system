import {TestBed} from "@angular/core/testing";
import {TokenService} from "./token.service";
import {Router} from "@angular/router";

describe('TokenService', () => {
  let service: TokenService;
  const token: string = 'token-x1-x2-x3';
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenService,
        { provide: Router, useValue: { navigate: jasmine.createSpy() } }
      ]
    });

    router = TestBed.inject(Router);
    service = TestBed.inject(TokenService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set token in the localstorage', () => {
    //Arrange

    //Act
    service.setToken(token);

    //Assert
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return the token', () => {
    //Arrange

    //Act
    service.setToken(token);
    let tokenDB = service.getToken();

    //Assert
    expect(tokenDB).toEqual(token);
  });

  it('should not return the token', () => {
    //Arrange
    //Act
    let tokenDB = service.getToken();

    //Assert
    expect(tokenDB).toBeFalsy();
  });

  it('should clear the localstorage and redirect', () => {
    //Arrange
    //Act
    service.setToken(token);
    service.clearOnLogout();

    //Assert
    expect(service.isAuthenticated()).toBeFalse();
    expect(localStorage.getItem('sessionToken')).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledOnceWith(["/login"]);
  });
});
