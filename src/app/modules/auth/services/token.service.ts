import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'sessionToken';
  private authenticated = false;

  constructor(private router: Router) {
    this.authenticated = !!this.getToken();
  }

  setToken(token: string): void {
    this.authenticated = true;
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearOnLogout(): void {
    this.authenticated = false;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  get isAuthenticated(): boolean {
    return this.authenticated;
  }
}
