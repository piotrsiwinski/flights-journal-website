import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User('', '', '');
  constructor(private userService: UserService) {

  }


  ngOnInit() {
  }

  onLoginFormSubmit(){
    this.userService
      .login(this.user)
      .subscribe(response => {}, (err)=>console.log(err));
  }
}
