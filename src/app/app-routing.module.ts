import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './page/layout/layout.component';
import { CovidDashboardComponent } from './page/covid-dashboard/covid-dashboard.component';
import { SignUpComponent } from './page/sign-up/sign-up.component';
import { LayoutLComponent } from './page/layout-l/layout-l.component';
import { SignInComponent } from './page/sign-in/sign-in.component';
import { UpdateProfileComponent } from './page/update-profile/update-profile.component';
import { GuardGuard } from './guard/guard.guard';
import { RegisterProfileComponent } from './page/register-profile/register-profile.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent,  canActivate: [GuardGuard],
    children: [
      {
        path: '', component: CovidDashboardComponent
      },
      {
        path: 're_profile', component: RegisterProfileComponent
      },
      {
        path: 'up_profile', component: UpdateProfileComponent
      }
    ]
  },
  {
    path: 'U',component: LayoutLComponent,
    children: [  
      {
        path: 's_up', component: SignUpComponent
      },
      {
        path: 's_in', component:  SignInComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
