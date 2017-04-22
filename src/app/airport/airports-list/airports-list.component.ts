import { Component, OnInit } from '@angular/core';
import {AirportViewModel} from "../../models/airport-view-model";
import {AirportService} from "../airport.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-airports-list',
  templateUrl: './airports-list.component.html',
  styleUrls: ['./airports-list.component.css']
})
export class AirportsListComponent implements OnInit {
  airports: AirportViewModel[];

  constructor(
    private airportService: AirportService
  ) { }

  ngOnInit() {
    this.airportService.searchAirports.subscribe(airports => this.airports = airports, error => console.log(error));
  }

  onSearchClick(airport: AirportViewModel){
    this.airportService.selectAirport.emit(airport);
  }

  onClearClick(){
    this.airports.length = 0;
    this.airports = null;
  }

}
