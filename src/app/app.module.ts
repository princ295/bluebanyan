import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './page/layout/layout.component';
import { CovidDashboardComponent } from './page/covid-dashboard/covid-dashboard.component';


import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LayoutLComponent } from './page/layout-l/layout-l.component';
import { SignUpComponent } from './page/sign-up/sign-up.component';
import { SignInComponent } from './page/sign-in/sign-in.component';


import { CovidService } from './service/covid.service';
import { HttpService } from './service/http.service';
import { UpdateProfileComponent } from './page/update-profile/update-profile.component';
import { InterceptorService } from './service/interceptor.service';
import { RegisterProfileComponent } from './page/register-profile/register-profile.component';
import { GuardGuard } from './guard/guard.guard';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    CovidDashboardComponent,
    LayoutLComponent,
    SignUpComponent,
    SignInComponent,
    UpdateProfileComponent,
    RegisterProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, NgSelectModule, FormsModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [
    CovidService, HttpService, InterceptorService,GuardGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
