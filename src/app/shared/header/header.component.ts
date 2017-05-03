import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../core/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.authService.Token.subscribe((token: string) => {
      console.log(token);
      this.isLoggedIn = token !== null;
    });
  }
  onLogoutClick(){
    this.authService.logout();
  }

}
