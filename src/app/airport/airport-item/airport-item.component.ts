import { Component, OnInit } from '@angular/core';
import {AirportService} from "../airport.service";
import {AirportViewModel} from "../../models/airport-view-model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-airport-item',
  templateUrl: './airport-item.component.html',
  styleUrls: ['./airport-item.component.css']
})
export class AirportItemComponent implements OnInit {
  selectedAirport: AirportViewModel;

  constructor(
    private airportService: AirportService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.airportService.selectAirport.subscribe(airport => this.selectedAirport = airport);
  }

  onClick(){
    this.selectedAirport = null;
  }

}
