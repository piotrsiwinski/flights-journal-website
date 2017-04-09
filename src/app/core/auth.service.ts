import { environment } from './../../environments/environment.prod';

import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {User} from "../models/user";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class AuthService {

  private URL = `${environment.baseApiUrl}`;
  private AuthToken: string;
  LogIn: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: Http) {
    console.log(`auth url: ${this.URL}`);
  }

  login(user: User){
    let token = 'Basic ' + btoa(user.login + ":" + user.password);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);

    return this.http
      .get(this.URL + '/auth', { withCredentials: true, headers: headers})
      .map((response: Response) => {
        if(response.status == 200){
          console.log(`Authenticated: ${JSON.stringify(response, null, 2)}`);
          this.AuthToken = token;
          this.LogIn.emit(this.AuthToken);
        }
        return response.json();
      })
      .catch(this.handleError);
  }

  register(user: User){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify(user);

    return this.http
      .post(this.URL + '/register', body, {headers: headers})
      .map((response: Response) => {console.log(response);
        if(response.status == 200){
          return response}
        })
      .catch(this.handleError);
  }

  logout(){
    this.AuthToken = null;
    this.LogIn.emit(this.AuthToken);
  }

  private handleError(error: Response | any){
    console.log(error);
    let errorMsg: string;
    if(error.status == 409){
      errorMsg = 'User with this login already exists'
    }

    return Observable.throw(errorMsg || error.toString());
  }

}
