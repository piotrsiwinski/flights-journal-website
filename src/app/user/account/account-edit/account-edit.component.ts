import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountEditModel} from "../../../models/account-edit-model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {
  editForm: FormGroup;
  errorMessage: string;
  user: AccountEditModel = {firstName: '', lastName: '', age: 0};


  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.initialize();
  }

  private initialize(): void {
    this.initializeForm(this.user);
    this.authService.getUserDetails().subscribe(this.handleInitResponse, this.handleError);
  }

  public initializeForm(user: AccountEditModel): void {
    this.editForm = this.formBuilder.group({
      firstName: [user.firstName],
      lastName: [user.lastName],
      age: [user.age]
    });
  }

  onSubmit() {
    const body = this.editForm.value;
    console.log(body);
    this.authService.saveUserDetails(body).subscribe(this.handleSubmitResponse, this.handleError);
  }

  private handleSubmitResponse = data => {
    console.log(JSON.stringify(data, null, 2));
    this.router.navigate(['/account']);
  }


  private handleInitResponse = data => {
    this.user = data;
    this.initializeForm(this.user);
  };

  private handleError = (err) => {
    console.log(JSON.stringify(err, null, 2));
    this.errorMessage = err.toString();
  }
}
