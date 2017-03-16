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
      console.log(token);
      this.isLoggedIn = token !== null;
    });
  }
  onLogoutClick(){
    this.isLoggedIn = false;
    this.router.navigate(['/']);

  }
}
