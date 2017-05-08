import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/header/header.component';
import {BannerComponent} from './shared/banner/banner.component';
import {FooterComponent} from './shared/footer/footer.component';
import {RouterModule} from "@angular/router";
import {appRoutes} from "./app.routing";
import {UserComponent} from './user/user.component';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {FlightComponent} from './flight/flight.component';
import {FlightsListComponent} from './flight/flights-list/flights-list.component';
import {AccountComponent} from './user/account/account.component';
import {ContactComponent} from './home/contact/contact.component';
import {AboutComponent} from './home/about/about.component';
import {AirportComponent} from './airport/airport.component';
import {AirportsListComponent} from './airport/airports-list/airports-list.component';
import {AirportItemComponent} from './airport/airport-item/airport-item.component';
import {AirportService} from "./airport/airport.service";
import {AirportSearchComponent} from './airport/airport-search/airport-search.component';
import {ErrorComponent} from './error/error.component';
import {AuthenticationGuard} from "./auth/auth-guard";
import {AddFlightComponent} from './flight/add-flight/add-flight.component';
import {FlightService} from "./flight/flight.service";
import {AuthService} from "./auth/auth.service";
import { UserFlightsComponent } from './flight/user-flights/user-flights.component';
import { FlightDetailsComponent } from './flight/flight-details/flight-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    HomeComponent,
    FooterComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    FlightComponent,
    FlightsListComponent,
    AccountComponent,
    ContactComponent,
    AboutComponent,
    AirportComponent,
    AirportsListComponent,
    AirportItemComponent,
    AirportSearchComponent,
    ErrorComponent,
    AddFlightComponent,
    UserFlightsComponent,
    FlightDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AirportService, AuthenticationGuard, FlightService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
