import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { HttpService } from '../service/http.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private webservice: HttpService, private router: Router) { }

  canActivate() {
    if (this.webservice.isLoggedIn()) {
      this.webservice.refreshToken();
      return true;
    } else {
      this.webservice.logout();
      this.router.navigate(['U/s_in']);
      return false;
    }
  }
}
