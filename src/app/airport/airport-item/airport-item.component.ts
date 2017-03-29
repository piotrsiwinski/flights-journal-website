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
    let id = this.route.snapshot.params['id'];
    this.airportService.getAirports().subscribe(data => this.selectedAirport = data.filter(x => x.id == id)[0]);
  }

}
