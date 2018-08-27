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
    console.log('intercepted HTTP call.');

    if (localStorage.getItem('token')) {
      console.log('you are logged in');
      request = request.clone({
        headers: request.headers.set('Authorization', localStorage.getItem('token'))
      });
    } else {
      console.log('you are not logged in');
    }
    return next.handle(request);
  }
}
