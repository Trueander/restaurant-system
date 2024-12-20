import {AuthGuard} from "./auth.guard";
import {TokenService} from "../services/token.service";
import {TestBed} from "@angular/core/testing";
import {LoginGuard} from "./login.guard";
import {Router} from "@angular/router";

describe('LoginGuard', () => {
  let loginGuard: LoginGuard;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;
  let router: Router;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TokenService', ['isAuthenticated']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: TokenService, useValue: spy },
        { provide: Router, useValue: { createUrlTree: jasmine.createSpy()}},
      ]
    });

    loginGuard = TestBed.inject(LoginGuard);
    tokenServiceSpy = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
    router = TestBed.inject(Router);
  });

  it('should return true if the user is not authenticated', () => {
    //Arrange
    tokenServiceSpy.isAuthenticated.and.returnValue(false);

    //Act
    const result = loginGuard.canActivate();

    //Assert
    expect(tokenServiceSpy.isAuthenticated).toHaveBeenCalled();
    expect(result).toBeTrue();
  });

  it('should redirect to the dashboard if the user is authenticated', () => {
    //Arrange
    tokenServiceSpy.isAuthenticated.and.returnValue(true);

    //Act
    loginGuard.canActivate();

    //Assert
    expect(tokenServiceSpy.isAuthenticated).toHaveBeenCalled();
    expect(router.createUrlTree).toHaveBeenCalledOnceWith(['/dashboard']);
  });
});
