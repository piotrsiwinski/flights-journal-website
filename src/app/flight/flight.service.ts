import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {environment} from "../../environments/environment.prod"
import {Observable} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {FlightModel} from "../models/flight-model";
import {DateHelper} from "../utils/date-helpers";
import {AddFlightModel} from "../models/add-flight-model";


@Injectable()
export class FlightService {

  private URL: string = environment.baseApiUrl;

  constructor(private http: Http, private authService: AuthService) {
  }

  getFlightByNumberAndDate(flight: FlightModel): Observable<any> {
    let date = flight.date.split('-');
    let year = date[0];
    let month = date[1];
    let day = date[2];

    const url = `${environment.baseApiUrl}/flight/${flight.number}/${year}/${month}/${day}`;

    return this.http
      .get(url)
      .map(this.extractData)
      .map(DateHelper.convertDate)
      .catch(this.handleError);
  }

  getUserFlights(): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.authService.retrieveToken().access_token
    });
    const options = new RequestOptions({withCredentials: true, headers: headers});

    return this.http.get(`${environment.baseApiUrl}/flight/all`, options)
      .map(this.extractData)
      .map((body: any) => {
        body.forEach(flight => flight.date = new Date(flight.date[0], flight.date[1], flight.date[2], flight.date[3], flight.date[4]));
        return body;
      })
      .catch(this.handleError);
  }

  addFlight(flight: AddFlightModel) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.authService.retrieveToken().access_token
    });
    const options = new RequestOptions({withCredentials: true, headers: headers});
    const body = JSON.stringify(flight);

    return this.http.post(this.URL + '/flight', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(response: Response): any {
    JSON.stringify(response);
    let body = response.json();
    return body || {};
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
    return Observable.throw(errorMessage);
  }
}
