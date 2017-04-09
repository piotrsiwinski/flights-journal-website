import { Component, OnInit }  from '@angular/core';
import { Router }             from "@angular/router";
import {AuthService} from "../../core/auth.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private forumBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.forumBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(){
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(this.onSubmitSuccess, this.onSubmitError);
  }

  onSubmitSuccess = () =>{
    this.router.navigate(['/'])
  };

  onSubmitError = (err: any) => {
    this.errorMessage = err.toString();
  }
}
