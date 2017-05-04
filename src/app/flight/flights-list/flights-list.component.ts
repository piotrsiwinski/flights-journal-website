import { Component, OnInit } from '@angular/core';
import {FlightService} from "../flight.service";

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css']
})
export class FlightsListComponent implements OnInit {
  flights;

  constructor(private flightService: FlightService) { }

  ngOnInit() {
    this.flightService.getUserFlights().subscribe(data =>
    {
      console.log(data);
      this.flights = data;
    });
  }

}
