import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();

    if(token){
      request = this.setTokenHeader(request, token);
    }

    return next
      .handle(request).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  private setTokenHeader(request: HttpRequest<unknown>, token: string){
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}
