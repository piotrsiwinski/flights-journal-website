import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {User} from "../models/user";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class UserService {
  private URL = "http://localhost:3000/";

  constructor(private http: Http) {

  }

  login(user : User){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = JSON.stringify(user);
    console.log(body);

    return this.http
      .post(this.URL + 'users/login', body, headers)
      .map((response: Response)=> response.json())
      .map(response => {
        console.log(typeof(response));
        localStorage.setItem('Auth', response.token)
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any){
    console.log(error);

    let errorMsg: string = "error";
    return Observable.throw(errorMsg);
  }


}
