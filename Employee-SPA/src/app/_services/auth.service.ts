import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from 'src/environments/environment';

// Http Options
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiBaseUrl = '';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  isadmin: boolean = false;
  decodedIsAdminFlagValue: string = '';

  constructor(private http: HttpClient) {
    this.apiBaseUrl = environment.apiBaseUrl + 'auth/';
   }

  login(model: any) {
    return this.http.post(this.apiBaseUrl + 'login', JSON.stringify(model), httpOptions).pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            localStorage.setItem('isadm', user.isadmin);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            this.isadmin = user.isadmin;
            // this.decodedIsAdminFlagValue = this.jwtHelper.urlBase64Decode(user.isadmin);
          }
        })
      );
  }

  // register(model: any) {
  //   return this.http.post(this.apiBaseUrl + 'register', model);
  // }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  isLoggedUserWithAdminRole() {
    const isadmin = localStorage.getItem('isadm');
    if (isadmin) {
      return (isadmin === 'true') ? true : false;
    }
    return false;
  }
}
