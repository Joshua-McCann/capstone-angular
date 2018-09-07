import { Injectable } from '@angular/core';
import {HttpRequest, HttpEvent, HttpInterceptor, HttpHandler } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token')) {
      request = request.clone({
        headers: request.headers.set('Authorization', localStorage.getItem('token'))
      });
    }
    return next.handle(request);
  }
}
