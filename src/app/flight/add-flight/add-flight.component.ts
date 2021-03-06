import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FlightService} from "../flight.service";
import {DateHelper} from "../../utils/date-helpers";
import {AddFlightModel} from "../../models/add-flight-model";

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {
  //TODO: Change to strong typed array
  flights;
  searchErrorMessage: string;

  addSuccess: boolean;
  addErrorMessage: string;
  form: FormGroup;
  formErrors = {
    'number': '',
    'origin': '',
    'destination': '',
    'date': ''
  };
  validationMessages = {
    'number': {},
    'origin': {
      'required': 'Origin is required.'
    },
    'destination': {
      'required': 'Destination is required.'
    },
    'date': {
      'required': 'Date is required.'
    },
  };


  constructor(private formBuilder: FormBuilder, private flightService: FlightService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  searchFlightsClick() {
    let formData = this.form.value;

    if(!formData.number && !formData.origin && !formData.destination){
      this.searchErrorMessage = 'Flight number or Origin and Destination has to be filled';
      return;
    }
    this.flightService
      .getFlightByNumberAndDate(this.form.value)
      .subscribe(data => {
          this.flights = data;
        }
        , error => {
          this.searchErrorMessage = 'Not found.' + error.toString();
        }
      );
  }

  onFlightClick(item: any) {
    console.log(JSON.stringify(item));

    let test: AddFlightModel = {
      flightNumber: item.flightNumber,
      destinationIata: item.destination.iata,
      originIata: item.origin.iata,
      dateTime: DateHelper.convertToDate(item.date)
    };
    this.flightService.addFlight(test).subscribe(data => {
        this.flights = data;
        this.addSuccess = true;
      }
      , error => {
        this.addSuccess = false;
        this.addErrorMessage = 'This flight is already added';
      }
    );
  }

  onClearClick() {
    this.flights = null;
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      number: [''],
      origin: ['',],
      destination: ['',],
      date: ['', [Validators.required]]
    });
    this.form.valueChanges.subscribe(data => this.onFormValueChanged(data));
    this.onFormValueChanged();
  }

  private onFormValueChanged(data?: any) {
    if (!this.form) {
      return;
    }
    const form = this.form;


    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}
