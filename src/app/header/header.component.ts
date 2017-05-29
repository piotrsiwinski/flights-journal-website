import {Component, DoCheck, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.isUserLoggedIn();
  }

  ngDoCheck(): void {
    this.ngOnInit();
  }

  private isUserLoggedIn() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
