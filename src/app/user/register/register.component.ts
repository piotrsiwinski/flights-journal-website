import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {Response} from "@angular/http";
import {CustomValidators} from "../../utils/custom-validators";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  userCreated: Boolean = false;
  errorMessage: string;
  formErrors = {
    'email': '',
    'login': '',
    'password': '',
    'confirmPassword': ''

  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'incorrectEmail': 'Invalid email'
    },
    'login': {
      'required': 'Login is required',
      'minlength': 'Login must be 5 characters long'
    },
    'password': {
      'required': 'Password is required',
      'minlength': 'Password must be 6 characters long',
    },
    'confirmPassword': {
      'required': 'Password is required',
      'minlength': 'Password must be 6 characters long',
      'match': 'Passwords doesn\'t match'
    }
  };

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, CustomValidators.emailValidator]],
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.registerForm) {
      return;
    }
    const form = this.registerForm;

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

  onSubmit() {
    console.log(this.registerForm);
    this.authService.register(this.registerForm.value).subscribe(this.onSubmitSuccess, this.onSubmitError);
  }

  onSubmitSuccess = (response: Response) => {
    this.errorMessage = null;
    this.userCreated = true;
  };

  onSubmitError = (err: any) => {
    this.errorMessage = err.toString();
  }

}
