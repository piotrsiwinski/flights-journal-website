import { Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./user/login/login.component";

const appRoutes : Routes = [
  { path: '',             component: HomeComponent },
  { path: 'user',         component: UserComponent },
  { path: 'login',         component: LoginComponent },
];

export {appRoutes};
