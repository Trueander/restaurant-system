import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, Router, UrlTree } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanMatch {
  
  constructor(
    private tokenService: TokenService, 
    private router: Router){}

  canMatch(): boolean | UrlTree {
    return this.isAuthenticated();
  }
  
  canActivate(): boolean | UrlTree {
    return this.isAuthenticated();
  }

  private isAuthenticated(): boolean | UrlTree {
    return this.tokenService.isAuthenticated ? true : this.router.createUrlTree(['/login']);
  }
  
}
