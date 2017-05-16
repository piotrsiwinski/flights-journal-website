import {Component, OnInit}  from '@angular/core';
import {Router}             from "@angular/router";

import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;

  constructor(private authService: AuthService,
              private router: Router,
              private forumBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.forumBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    //console.log(this.loginForm.value);
    //this.authService.login(this.loginForm.value).subscribe(this.onSubmitSuccess, this.onSubmitError);
    this.authService.login(this.loginForm.value)
      .subscribe(() => {
        this.router.navigate(['/'])
        window.location.reload();

      },
      error => this.errorMessage = error.toString());
  }
}
