import {BrowserModule} from '@angular/platform-browser';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routing';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {FlightsListComponent} from './flight/flights-list/flights-list.component';
import {AccountComponent} from './user/account/account.component';
import {ContactComponent} from './home/contact/contact.component';
import {AboutComponent} from './home/about/about.component';
import {AirportComponent} from './airport/airport.component';
import {AirportsListComponent} from './airport/airports-list/airports-list.component';
import {AirportItemComponent} from './airport/airport-item/airport-item.component';
import {AirportService} from './airport/airport.service';
import {ErrorComponent} from './error/error.component';
import {AuthenticationGuard} from './auth/auth-guard';
import {AddFlightComponent} from './flight/add-flight/add-flight.component';
import {FlightService} from './flight/flight.service';
import {AuthService} from './auth/auth.service';
import {UserFlightsComponent} from './flight/user-flights/user-flights.component';
import {FlightDetailsComponent} from './flight/flight-details/flight-details.component';
import {AccountEditComponent} from './user/account/account-edit/account-edit.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {environment} from './../environments/environment.prod';
import {AdsenseModule} from "ng2-adsense";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    FlightsListComponent,
    AccountComponent,
    ContactComponent,
    AboutComponent,
    AirportComponent,
    AirportsListComponent,
    AirportItemComponent,
    ErrorComponent,
    AddFlightComponent,
    UserFlightsComponent,
    FlightDetailsComponent,
    AccountEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: environment.apiKey
    }),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-7640562161899788',
      adSlot: 7259870550
    }),
  ],
  providers: [AuthService, AirportService, AuthenticationGuard, FlightService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
