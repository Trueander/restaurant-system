import {AuthGuard} from "./auth.guard";
import {TokenService} from "../services/token.service";
import {TestBed} from "@angular/core/testing";

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TokenService', ['isAuthenticated']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: TokenService, useValue: spy }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    tokenServiceSpy = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
  });

  it('should return true when isAuthenticated is true', () => {
    //Arrange
    tokenServiceSpy.isAuthenticated.and.returnValue(true);

    //Act
    const result = authGuard.canMatch();

    //Assert
    expect(tokenServiceSpy.isAuthenticated).toHaveBeenCalled();
    expect(result).toBeTrue();
  });

  it('should return false when isAuthenticated is false', () => {
    //Arrange
    tokenServiceSpy.isAuthenticated.and.returnValue(false);

    //Act
    const result = authGuard.canMatch();

    //Assert
    expect(tokenServiceSpy.isAuthenticated).toHaveBeenCalled();
    expect(result).toBeFalse();
  });
});
