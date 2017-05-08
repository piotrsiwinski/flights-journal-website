import {Component, Input, OnInit} from '@angular/core';
import {FlightService} from "../flight.service";
import {AddFlightModel} from "../../models/add-flight-model";
import {DateHelper} from "../../utils/date-helpers";

@Component({
  selector: 'app-select-flight',
  templateUrl: './select-flight.component.html',
  styleUrls: ['./select-flight.component.css']
})
export class SelectFlightComponent implements OnInit {
  @Input() flight;

  constructor(private flightService: FlightService) { }

  ngOnInit() {
  }

  onFlightClick(item: any){
    console.log(JSON.stringify(item));

    let test: AddFlightModel = {
      flightNumber: item.flightNumber,
      destinationIata: item.destination.iata,
      originIata: item.origin.iata,
      dateTime: DateHelper.convertToDate(item.date)
    };
    this.flightService.addFlight(test).subscribe(data => console.log(data), err => console.log(err));
  }

}
