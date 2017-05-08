import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FlightService} from "../flight.service";

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {

  //TODO: Change to strong typed array
  flights;
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
    this.flightService
      .getFlightByNumberAndDate(this.form.value)
      .subscribe(data => this.flights = data, error =>  console.log(JSON.stringify(error)));
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      number: [''],
      origin: ['',],
      destination: ['', ],
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
