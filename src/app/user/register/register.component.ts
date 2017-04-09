import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {AuthService} from "../../core/auth.service";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  userCreated: Boolean = false;
  errorMessage: string;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, this.emailValidator]],
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  // Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")

  emailValidator(control: FormControl): {[key: string]: boolean}{
    if(control.value === 'test'){
      return { incorrectEmail: true };
    }
    return null;
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
    'password':{
      'required': 'Password is required',
      'minlength': 'Password must be 6 characters long',
    },
    'confirmPassword':{
      'required': 'Password is required',
      'minlength': 'Password must be 6 characters long',
      'match': 'Passwords doesn\'t match'
    }
  };

  onSubmit() {
    console.log(this.registerForm);
    this.authService.register(this.registerForm.value).subscribe(() => this.userCreated = true, err => this.errorMessage = err.toString());
  }


}
