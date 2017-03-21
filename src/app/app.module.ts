import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { NavigationComponent } from './shared/header/navigation/navigation.component';
import { BannerComponent } from './shared/banner/banner.component';

import { FooterComponent } from './shared/footer/footer.component';

import {RouterModule} from "@angular/router";
import {appRoutes} from "./app.routing";
import { UserComponent } from './user/user.component';
import {HomeComponent} from "./home/home.component";
import { LoginComponent } from './user/login/login.component';
import {UserService} from "./user/user.service";
import { RegisterComponent } from './user/register/register.component';
import { FlightComponent } from './flight/flight.component';
import { FlightsListComponent } from './flight/flights-list/flights-list.component';
import { AccountComponent } from './user/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    BannerComponent,
    HomeComponent,
    FooterComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    FlightComponent,
    FlightsListComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
