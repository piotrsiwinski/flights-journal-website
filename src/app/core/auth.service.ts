import {environment} from './../../environments/environment.prod';

import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {User} from "../models/user";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class AuthService {

  private URL = `${environment.baseApiUrl}`;
  private AuthToken: string;
  Token: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: Http) {
  }

  login(user: User) {
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

  register(user: User) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = JSON.stringify(user);

    return this.http
      .post(this.URL + '/register', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  logout() {
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
