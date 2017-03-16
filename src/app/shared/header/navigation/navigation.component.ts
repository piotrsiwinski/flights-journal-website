import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit() {
    this.userService.LogIn.subscribe((token: string) => {
      if(token){
        this.isLoggedIn = true;
      }else {
        this.isLoggedIn = false;
      }
    });
    // console.log(`ngOnInit: ${JSON.stringify(this.isLoggedIn.toString())}`);


  }
  onLogoutClick(){
    this.isLoggedIn = null;
    this.router.navigate(['/']);

  }
}
