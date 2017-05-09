import {environment} from './../../environments/environment.prod';

import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {LoginModel} from "../models/login-model";
import {AuthTokenModel} from "../models/auth-token-model";
import {RegisterModel} from "../models/register-model";

@Injectable()
export class AuthService {
  private LOCAL_STORAGE_AUTH_TOKEN_KEY: string= 'auth-token';
  constructor(private http: Http) {
  }

  register(user: RegisterModel): Observable<Response>{
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(`${environment.baseApiUrl}/register`, body, {headers: headers})
      .catch(this.handleError);
  }

  login(user: LoginModel): Observable<any> {
    return this.getToken(user)
      .catch(this.handleError);
  }

  logout(): void{
    this.removeToken();
    this.http.get(`${environment.baseApiUrl}/auth/logout`).subscribe();
  }

  isLoggedIn(): boolean{
    const token: AuthTokenModel = this.retrieveToken();
    return token !== null;
  }

  private getToken(user: LoginModel): Observable<Response>{
    const token: AuthTokenModel = {access_token: 'Basic ' + btoa(user.login + ":" + user.password)};
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': token.access_token});
    const options = new RequestOptions({withCredentials: true, headers: headers});

    return this.http.get(`${environment.baseApiUrl}/auth`, options)
      .do(() =>{
        this.storeToken(token)
      })
      .catch(this.handleError);
  }

  retrieveToken(): AuthTokenModel{
    const tokenString = localStorage.getItem(this.LOCAL_STORAGE_AUTH_TOKEN_KEY);
    const tokenModel: AuthTokenModel = tokenString == null ? null : JSON.parse(tokenString);
    return tokenModel;
  }

  private storeToken(token: AuthTokenModel): void{
    localStorage.setItem(this.LOCAL_STORAGE_AUTH_TOKEN_KEY, JSON.stringify(token));
  }

  private removeToken(): void {
    localStorage.removeItem(this.LOCAL_STORAGE_AUTH_TOKEN_KEY);
  }

  private handleError(error: Response | any) {
    let errorsDescription = {
      401: 'User unauthorized',
      409: 'User with this login already exists'
    };
    return Observable.throw(errorsDescription[error.status] || error.toString());
  }
}
