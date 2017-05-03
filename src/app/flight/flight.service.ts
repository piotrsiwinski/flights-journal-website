import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {environment} from "../../environments/environment.prod"
import {Flight} from "../models/flight";
import {Observable} from "rxjs";
import {FlightViewModel} from "../models/flight-view-model";
import {UserService} from "../user/user.service";
import {AuthService} from "../core/auth.service";

@Injectable()
export class FlightService {

  private URL: string = environment.baseApiUrl;
  private token: string;

  constructor(private http: Http, private authService: AuthService) {
    this.authService.Token.subscribe(token => this.token = token);
  }

  getFlightByNumberAndDate(flight: Flight): Observable<any> {
    let date = flight.date.toString().split('-');
    let year = date[0];
    let month = date[1];
    let day = date[2];

    let url = this.URL + `/flight/${flight.number}/${year}/${month}/${day}`;
    console.log(`Url in service:  ${url}`);

    return this.http
      .get(url)
      .map(this.extractData)
      .map(this.convertDate)
      .catch(this.handleError);
  }

  addFlight(flight: any){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.token);

    console.log(`Auth token in flight service ${this.token}`);
    let body = JSON.stringify(flight);

    console.log(`BODY: ${body}`);
    return this.http
      .post(this.URL + '/flight', flight, { withCredentials: true, headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }
  private extractData(response: Response): any {
    JSON.stringify(response);
    let body = response.json();
    return body || {};
  }

  private convertDate(object: any) {
    for (let item of object) {
      item.date = new Date(item.date[0], item.date[1]-1, item.date[2]-1, item.date[3], item.date[4])
    }

    return object;
  }

  private handleError(error: Response | any) {
    let errorMessage: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errorMessage = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errorMessage = error.message ? error.message : error.toString();
    }
    console.log(error);
    return Observable.throw(errorMessage)
  }
}
