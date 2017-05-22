import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {AccountEditModel} from "../../models/account-edit-model";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: AccountEditModel = {firstName: '', lastName: '', age: 0};

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getUserDetails().subscribe(this.handleResponse, this.handleError);
  }

  private handleResponse = data => {
    console.log(data);
    this.user = data;
  }

  private handleError = error => {
    console.log(JSON.stringify(error, null, 2));
  }
}
