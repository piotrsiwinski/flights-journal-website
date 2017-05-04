import {Routes} from "@angular/router";
import {UserComponent} from "./user/user.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./user/login/login.component";
import {RegisterComponent} from "./user/register/register.component";
import {AccountComponent} from "./user/account/account.component";
import {AboutComponent} from "./home/about/about.component";
import {ContactComponent} from "./home/contact/contact.component";
import {AirportComponent} from "./airport/airport.component";
import {AirportItemComponent} from "./airport/airport-item/airport-item.component";
import {ErrorComponent} from "./error/error.component";
import {AuthenticationGuard} from "./auth/auth-guard";
import {AddFlightComponent} from "./flight/add-flight/add-flight.component";
import {FlightsListComponent} from "./flight/flights-list/flights-list.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user', component: UserComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'account', component: AccountComponent, canActivate: [AuthenticationGuard]},
  {path: 'contact', component: ContactComponent},
  {path: 'about', component: AboutComponent},
  {path: 'airport', component: AirportComponent},
  {path: 'airport/:name', component: AirportItemComponent},
  {path: 'flight', component: FlightsListComponent, canActivate: [AuthenticationGuard]},
  {path: 'flight/add', component: AddFlightComponent},
  {path: '**', component: ErrorComponent},
];


export {appRoutes};
