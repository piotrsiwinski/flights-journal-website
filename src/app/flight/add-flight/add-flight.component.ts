import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FlightService} from "../flight.service";
import {Flight} from "../../models/flight";

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {
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

  constructor(private formBuilder: FormBuilder,
              private flightService: FlightService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    this.flightService
      .getFlightByNumberAndDate(this.form.value)
      .subscribe(data => this.handleData(data), this.handleError);
  }

  onFlightClick(item: any){
    console.log(JSON.stringify(item));
    let date: string = item.date.getFullYear() + '-' + item.date.getMonth()+ '-' + item.date.getDay() + ' ' + item.date.getHours() + ':'+item.date.getMinutes();

    let flight = {
      flightNumber: item.flightNumber,
      destinationIata: item.destination.iata,
      originIata: item.origin.iata,
      dateTime: date
    };
    this.flightService.addFlight(flight).subscribe(data => console.log(data), err => console.log(err));
  }

  handleData(data: any) {
    this.flights = data;
  }

  handleError(error: any) {
    console.log(JSON.stringify(error));
  }
  private buildForm(): void {
    this.form = this.formBuilder.group({
      number: [''],
      origin: ['',],
      destination: ['', ],
      date: ['', [Validators.required]]
    });
    this.form.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
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

  onClearClick(){
    this.flights= null;
  }
}
