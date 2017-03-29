import { Component, OnInit } from '@angular/core';
import {AirportViewModel} from "../../models/airport-view-model";
import {AirportService} from "../airport.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  selectedAirport: AirportViewModel;

  constructor(
    private airportService: AirportService
  ) { }

  ngOnInit() {
    this.airportService.selectAirport.subscribe(airport => this.selectedAirport = airport);
  }

}
