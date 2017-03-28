import { Component, OnInit } from '@angular/core';
import {AirportService} from "./airport.service";

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css'],
  providers: [AirportService]
})
export class AirportComponent implements OnInit {

  constructor(
    private airportService: AirportService
  ) { }

  ngOnInit() {
  }

}
