import { Component, OnInit } from '@angular/core';
import {AirportService} from "../airport.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-airport-search',
  templateUrl: './airport-search.component.html',
  styleUrls: ['./airport-search.component.css']
})
export class AirportSearchComponent implements OnInit {
  searchForm: FormGroup;

  constructor(
    private airportService: AirportService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  onSubmit(){
    this.airportService
      .getAirports(this.searchForm.value.name)
      .subscribe(data => this.airportService.searchAirports.emit(data));
  }

}
