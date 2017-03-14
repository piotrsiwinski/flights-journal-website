import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TopWrapperComponent } from './header/top-wrapper/top-wrapper.component';
import { NavigationComponent } from './header/navigation/navigation.component';
import { BannerComponent } from './header/banner/banner.component';
import { FeatureComponent } from './header/feature/feature.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { CompanyComponent } from './company/company.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopWrapperComponent,
    NavigationComponent,
    BannerComponent,
    FeatureComponent,
    BodyComponent,
    FooterComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
