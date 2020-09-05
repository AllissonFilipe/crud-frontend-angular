import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { async } from '@angular/core/testing';
import * as jwt_decode from 'jwt-decode';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public apiUrl = 'http://localhost:3333/users';

  constructor(private http: HttpClient) { }

  async login(user: User) {
    const result = await this.http.post<any>(`${this.apiUrl}/auth`, user).toPromise();
    if (result && result.access_token) {
      window.localStorage.setItem('token', result.access_token);
      return true;
    }

    return false;
  }

  getAuthorizationToken() {
    const token = window.localStorage.getItem('token');
    return token;
  }

  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if(!token){
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }
}
