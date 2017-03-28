import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {AuthService} from "../../core/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User('','','', '');
  userCreated = false;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  onRegisterFormSubmit(){
    this.authService
      .register(this.user)
      .subscribe(() => {this.userCreated = true}, err => {this.errorMessage = err.toString()});
  }


}
