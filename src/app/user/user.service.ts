import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {User} from "../models/user";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class UserService {
  private URL = "http://localhost:11686/api/";

  constructor(private http: Http) {

  }

  login(user : User){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = JSON.stringify(user);
    console.log(body);

    return this.http
      .post(this.URL + 'Account/Register', body, headers)
      .map((response: Response)=> response.json())
      .map(response => {
        console.log(typeof(response));
        localStorage.setItem('Auth', response.token)
      })
      .catch(this.handleError);
  }

  register(user: User){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify(user);
    console.log(body);

    return this.http
      .post(this.URL + 'Account/Register', body, headers)
      .map((response: Response) => response.json())
      .map(response =>{
        console.log(response);
        return response;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any){
    console.log(error);

    let errorMsg: string = "error";
    return Observable.throw(errorMsg);
  }


}
