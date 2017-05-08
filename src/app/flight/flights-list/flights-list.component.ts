import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FlightService} from "../flight.service";

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css']
})
export class FlightsListComponent implements OnInit {
  //TODO: Change to strong typed array
  flights;

  @Output() flightSelected = new EventEmitter<any>();

  constructor(private flightService: FlightService) { }

  ngOnInit() {
    this.flightService.getUserFlights().subscribe(data =>
    {
      console.log(data);
      this.flights = data;
    });
  }

  onClick(flight){
    this.flightSelected.emit(flight);
  }
}
