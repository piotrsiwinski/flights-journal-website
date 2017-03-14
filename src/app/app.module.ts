import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { TopWrapperComponent } from './shared/header/top-wrapper/top-wrapper.component';
import { NavigationComponent } from './shared/header/navigation/navigation.component';
import { BannerComponent } from './shared/header/banner/banner.component';
import { FeatureComponent } from './shared/header/feature/feature.component';

import { FooterComponent } from './shared/footer/footer.component';

import {RouterModule} from "@angular/router";
import {appRoutes} from "./app.routing";
import { UserComponent } from './user/user.component';
import {HomeComponent} from "./home/home.component";
import {CompanyComponent} from "./home/company-tst/company.component";
import { LoginComponent } from './user/login/login.component';
import {UserService} from "./user/user.service";
import { RegisterComponent } from './user/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopWrapperComponent,
    NavigationComponent,
    BannerComponent,
    FeatureComponent,
    HomeComponent,
    FooterComponent,
    CompanyComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent
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
