import {environment} from './../../environments/environment.prod';

import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from "@angular/http";
import {User} from "../models/user";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {LoginModel} from "../models/login-model";
import {AuthTokenModel} from "../models/auth-token-model";

@Injectable()
export class AuthService {
  private LOCAL_STORAGE_AUTH_TOKEN_KEY: string= 'auth-token';

  private URL = `${environment.baseApiUrl}`;
  public AuthToken: string;
  Token: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: Http) {
  }

  loginOld(user: User) {
    let token = 'Basic ' + btoa(user.login + ":" + user.password);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    let options = {withCredentials: true, headers: headers};

    return this.http
      .get(this.URL + '/auth', options)
      .map((response: Response) => {
        this.AuthToken = token;
        this.Token.emit(this.AuthToken);
        return response.json();
      })
      .catch(this.handleError);
  }

  login(user: LoginModel): Observable<any> {
    return this.getToken(user)
      .catch(this.handleError);
  }

  logout(): void{
    this.removeToken();
  }

  private getToken(user: LoginModel): Observable<Response>{
    const token: AuthTokenModel = {access_token: 'Basic ' + btoa(user.login + ":" + user.password)};
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': token.access_token});
    const options = new RequestOptions({withCredentials: true, headers: headers});

    return this.http.get(`${environment.baseApiUrl}/auth`, options)
      .do(() =>{
        this.storeToken(token)
      });
  }

  private storeToken(token: AuthTokenModel): void{
    localStorage.setItem(this.LOCAL_STORAGE_AUTH_TOKEN_KEY, JSON.stringify(token));
  }

  private retrieveToken(): AuthTokenModel{
    const tokenString = localStorage.getItem(this.LOCAL_STORAGE_AUTH_TOKEN_KEY);
    const tokenModel: AuthTokenModel = tokenString == null ? null : JSON.parse(tokenString);
    return tokenModel;
  }

  private removeToken(): void {
    localStorage.removeItem(this.LOCAL_STORAGE_AUTH_TOKEN_KEY);
  }

  public isLoggedIn(): boolean{
    const token: AuthTokenModel = this.retrieveToken();
    return token !== null;
  }

  register(user: User) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = JSON.stringify(user);

    return this.http
      .post(this.URL + '/register', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  logoutOld() {
    this.AuthToken = null;
    this.Token.emit(this.AuthToken);
  }

  private handleError(error: Response | any) {
    let errorsDescription = {
      401: 'User unauthorized',
      409: 'User with this login already exists'
    };
    return Observable.throw(errorsDescription[error.status] || error.toString());
  }

  isAuthenticated(): Observable<boolean> | boolean {
    return this.AuthToken != null;
  }
}
