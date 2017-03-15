import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User('','','', '');
  constructor(private userService: UserService) {

  }

  ngOnInit() {
  }

  onLoginFormSubmit(){
    console.log(JSON.stringify(this.user, null, 2));
    this.userService.register(this.user).subscribe( data => {console.log(`Register component: ${data}`)});
  }

}
