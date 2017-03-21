import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {User} from "../models/user";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {userInfo} from "os";

@Injectable()
export class UserService {
  private URL = "http://139.59.144.209:8080/flightsjournal/";
  // private URL = "http://192.168.1.20:8080/";

  private AuthToken: string;

  LogIn: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: Http) {
  }
  login(user: User){
    let token = 'Basic ' + btoa(user.login + ":" + user.password);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);

    return this.http
      .get(this.URL + 'auth', { withCredentials: true, headers: headers})
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
      .post(this.URL + '/register', body, {headers})
      .map((response: Response) => {console.log(response); return response})
      .catch(this.handleError);
  }

  logout(){
    this.AuthToken = null;
    this.LogIn.emit(this.AuthToken);
  }

  private handleError(error: Response | any){
    console.log(error);

    let errorMsg: string = "error";
    return Observable.throw(errorMsg);
  }


}
