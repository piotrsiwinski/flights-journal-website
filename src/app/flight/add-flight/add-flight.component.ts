import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {
  form: FormGroup;
  formErrors = {
    'number': '',
    'origin': '',
    'destination': '',
    'date': ''
  };

  validationMessages = {
    'number': {

    },
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

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.buildForm();
    //subscribe to service
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      number: [''],
      origin: ['', [Validators.required]],
      destination: ['', [Validators.required]],
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

  onSubmit(){
    console.log(this.form.value)
  }
}
