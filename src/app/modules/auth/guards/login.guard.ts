import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  private tokenService = inject(TokenService);
  private router = inject(Router)
  canActivate(): boolean | UrlTree {
      return !this.tokenService.isAuthenticated ? true : this.router.createUrlTree(['/dashboard']);
  }
  
}
