import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loggedIn$: EventEmitter<string>;
  private apiURL = `http://localhost:8080/`;
  private user = null;
  private snackBar;

  constructor(private http: HttpClient, private matSnackBar: MatSnackBar) {
    console.log('service created');
    this.snackBar = this.matSnackBar;
    this.loggedIn$ = new EventEmitter<string>();
  }

  login(username: string, password: string) {
    this.http.post(this.apiURL + 'login', {username: username, password: password}, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'),
      observe: 'response'
    }).toPromise()
      .then(
        (data: any) => {
          localStorage.setItem('token', data.headers.get('Authorization').substring(7));
          this.setUser(JSON.parse(jwtDecode(localStorage.getItem('token')).sub));
        }, (error: any) => {
          console.log(error);
          this.snackBar.open('Unable to login. Please check username and password and try again.', null, {
            duration: 2500,
            panelClass: ['error-snackbar']
          });
        });
  }

  register(username: string, password: string, passwordCheck: string, email: string) {
    console.log(password.length);
    if (password.length < 8) {
      this.snackBar.open('Password is less than eight characters long.', null, {
        duration: 2500,
        panelClass: ['error-snackbar']
      });
    } else if (password !== passwordCheck) {
      this.snackBar.open('Passwords don\'t match.', null, {
        duration: 2500,
        panelClass: ['error-snackbar']
      });
    } else {
      console.log('registering user');
      this.http.post(this.apiURL + 'user', {username: username, password: password, email: email}, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json'),
        observe: 'response'
      }).toPromise()
        .then(
          (data: any) => {
            localStorage.setItem('token', data.headers.get('Authorization').substring(7));
            this.setUser(JSON.parse(jwtDecode(localStorage.getItem('token')).sub));
          }, (error: any) => {
            this.snackBar.open(error.error.message, null, {
              duration: 2500,
              panelClass: ['error-snackbar']
            });
          });
    }
  }

  setUser(user: string) {
    this.user = user;
    this.loggedIn$.emit('Logout');
  }

  getUser() {
    return this.user;
  }

  logout() {
    localStorage.removeItem('token');
    this.user = null;
    this.loggedIn$.emit('Login');
  }

  isLoggedIn() {
    return this.user !== undefined && this.user !== null;
  }
}
