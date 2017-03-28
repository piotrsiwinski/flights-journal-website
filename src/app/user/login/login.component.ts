import { Component, OnInit }  from '@angular/core';
import { Router }             from "@angular/router";
import { User }               from "../../models/user";
import {AuthService} from "../../core/auth.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

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
    this.authService.login(this.loginForm.value).subscribe(()=>{this.router.navigate(['/'])}, (err)=> console.log(err));

  }
}
