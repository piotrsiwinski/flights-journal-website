import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User('','','', '');

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  onRegisterFormSubmit(){
    this.userService
      .register(this.user)
      .subscribe(()=>{
        this.router.navigate(['/'])
      });
  }

}
