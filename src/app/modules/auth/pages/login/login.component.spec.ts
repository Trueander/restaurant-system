import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {AuthRoutingModule} from "../../auth-routing.module";
import {SharedModule} from "../../../../shared/shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {LoginRequest} from "../../models/login-request";
import {of, throwError} from "rxjs";
import {LoginService} from "../../services/login.service";
import {TokenService} from "../../services/token.service";
import {Router} from "@angular/router";
import {By} from "@angular/platform-browser";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let tokenService: TokenService;
  let router: Router;
  const credentials: LoginRequest = { email: 'ander@gmail.com', password: '12345678' };
  let loginService: jasmine.SpyObj<LoginService>;

  beforeEach(async () => {
    loginService = jasmine.createSpyObj('LoginService', ['login']);
    loginService.login.and.returnValue(of({ token: 'token' }));

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule,
        NgOptimizedImage,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: LoginService, useValue: loginService},
        { provide: TokenService, useValue: {setToken: jasmine.createSpy()} },
        { provide: Router, useValue: { navigate: jasmine.createSpy() } },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    tokenService = TestBed.inject(TokenService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should employee-form login', () => {
    expect(component).toBeTruthy();
  });

  it('should have undefined errorMessage', () => {
    expect(component.errorMessage).toBeFalsy();
  });

  it('should have an invalid form', () => {
    expect(component.loginForm.invalid).toBe(true);
  });

  it('should have valid form', () => {

    component.loginForm.patchValue(credentials);
    expect(component.loginForm.valid).toBe(true);
  });

  it('should call loginservice.login, set token, and navigate on success', () => {
    //Arrange
    component.loginForm.setValue(credentials);

    //Act
    component.login();

    //Assert
    expect(loginService.login).toHaveBeenCalledWith(credentials);
    expect(tokenService.setToken).toHaveBeenCalledWith('token');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(component.errorMessage).toBeFalsy();
  });

  it('should call loginservice.login, but it should return an error', () => {
    //Arrange
    loginService.login.and.returnValue(throwError(() => new Error('Login failed')));
    component.loginForm.setValue(credentials);

    //Act
    component.login();
    fixture.detectChanges();

    //Assert
    expect(loginService.login).toHaveBeenCalledWith(credentials);
    expect(tokenService.setToken).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.errorMessage).toBeTruthy();
    expect(component.errorMessage).toEqual('Usuario y/o contraseña incorrecta');

    const matErrorElement = fixture.debugElement.query(By.css('.m-bottom-10 mat-error'));
    const matErrorInnerText = matErrorElement.nativeElement.innerText;
    expect(matErrorInnerText).toEqual('Usuario y/o contraseña incorrecta');
  });
});
