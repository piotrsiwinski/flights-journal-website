import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../user/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.authService.LogIn.subscribe((token: string) => {
      console.log(token);
      this.isLoggedIn = token !== null;
    });
  }
  onLogoutClick(){
    this.authService.logout();
  }
}

