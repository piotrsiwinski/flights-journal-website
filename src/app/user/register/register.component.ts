import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {AuthService} from "../../core/auth.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  user: User = new User('','','', '');
  userCreated = false;
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email:            ['', [Validators.required]],
      login:            ['', [Validators.required]],
      password:         ['', [Validators.required]],
      confirmPassword:  ['', [Validators.required]]
    });
  }

  onSubmit(){
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe(()=>this.userCreated = true, err => this.errorMessage = err.toString());
  }
  onRegisterFormSubmit(){
    this.authService
      .register(this.user)
      .subscribe(() => {this.userCreated = true}, err => {this.errorMessage = err.toString()});
  }


}
