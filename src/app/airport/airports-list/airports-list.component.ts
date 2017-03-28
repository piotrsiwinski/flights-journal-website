import { Component, OnInit } from '@angular/core';
import {AirportViewModel} from "../../models/airport-view-model";
import {AirportService} from "../airport.service";

@Component({
  selector: 'app-airports-list',
  templateUrl: './airports-list.component.html',
  styleUrls: ['./airports-list.component.css']
})
export class AirportsListComponent implements OnInit {
  airports: AirportViewModel[];

  constructor(private airportService: AirportService) { }

  ngOnInit() {
    this.airportService.getAirports().subscribe(airports => this.airports = airports.slice(0, 10), error => console.log(error));
  }

}
