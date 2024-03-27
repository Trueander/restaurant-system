import { Component, OnInit, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  
  constructor(
    private router: Router, 
    private loginService: LoginService, 
    private tokenService: TokenService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  login(): void{
    this.loginService.login(this.loginForm.value)
        .subscribe(response => {
          this.tokenService.setToken(response.token);
          this.router.navigate(['/dashboard']);
        });
  }
}