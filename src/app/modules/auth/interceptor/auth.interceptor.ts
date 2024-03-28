import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { TokenService } from '../services/token.service';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import {SweetAlertService} from "../../../shared/services/sweet-alert.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService,
              private sweetAlertService: SweetAlertService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();

    if(token) {
      const decodedToken: JwtPayload = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if(decodedToken && decodedToken.exp && decodedToken.exp < currentTime) {
        this.tokenService.clearOnLogout();
        this.sweetAlertService.infoAlert('Sesión expirada, vuelva a iniciar sesión');

        return throwError(() => new Error('Token expired'));
      }

      const cloneRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(cloneRequest);
    }
    return next.handle(request);
  }
}
