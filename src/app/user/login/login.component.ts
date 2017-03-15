import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User('', '', '');
  constructor(private userService: UserService, private router: Router) {

  }


  ngOnInit() {
  }

  onLoginFormSubmit(){
    this.userService
      .login(this.user)
      .subscribe(response => { this.router.navigate(['/'])}, (err)=>console.log(err));
  }
}
