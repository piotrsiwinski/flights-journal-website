import {environment} from './../../environments/environment.prod';

import {EventEmitter, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {AirportViewModel} from '../models/airport-view-model';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AirportService {
  private URL: string = environment.baseApiUrl;

  selectAirport: EventEmitter<AirportViewModel> = new EventEmitter<AirportViewModel>();
  searchAirports: EventEmitter<AirportViewModel[]> = new EventEmitter<AirportViewModel[]>();

  constructor(private http: Http) {

  }

  getAirportsWithLimit(name: string, page: number): Observable<any> {
    return this.http.get(this.URL + `/airport/limit/${name}?page=${page}&size=10`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAirports(name: string): Observable<any> {
    return this.http.get(this.URL + `/airport/${name}/details`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
