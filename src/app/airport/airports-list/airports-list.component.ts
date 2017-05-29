import {Component, OnInit} from "@angular/core";
import {AirportViewModel} from "../../models/airport-view-model";
import {AirportService} from "../airport.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-airports-list',
  templateUrl: './airports-list.component.html',
  styleUrls: ['./airports-list.component.css']
})
export class AirportsListComponent implements OnInit {
  pageNumber = 0;
  searchForm: FormGroup;
  airports: AirportViewModel[];

  constructor(private airportService: AirportService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.airportService.searchAirports.subscribe(airports => this.airports = airports, error => console.log(error));
    this.searchForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSearchSubmit() {
    this.airportService
      .getAirportsWithLimit(this.searchForm.value.name, 0)
      .subscribe(this.onSearchSubmitSuccess);
  }

  onSearchSubmitSuccess = (data) => {
    this.airports = data;
    if (this.airports.length === 0) {
      this.pageNumber = 0;
    }
  }

  onPreviousClick() {
    this.pageNumber--;
    if (this.pageNumber >= 0) {
      this.airportService
        .getAirportsWithLimit(this.searchForm.value.name, this.pageNumber)
        .subscribe(this.onSearchSubmitSuccess);
    }
  }

  onNextClick() {
    this.pageNumber++;
    if (this.pageNumber > 0) {
      this.airportService
        .getAirportsWithLimit(this.searchForm.value.name, this.pageNumber)
        .subscribe(this.onSearchSubmitSuccess);
    }
  }

  onAirportItemClick(airport: AirportViewModel) {
    this.airportService.selectAirport.emit(airport);
  }

  onClearClick() {
    this.airports.length = 0;
    this.airports = null;
  }

}
