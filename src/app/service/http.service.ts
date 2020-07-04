import { Injectable } from '@angular/core';

import { User } from '../../model/user';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

import * as jwt_decode from "jwt-decode";
import * as moment from 'moment';
import { JWTPayload } from "../.././model/payload";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  readonly root_api= 'http://127.0.0.1:8000/';

  private setSession(authResult) {
    console.log('api call have done')
    const token = authResult.token;

    alert(JSON.stringify(jwt_decode(token)))
    const payload = <JWTPayload> jwt_decode(token);
    const expiresAt = moment.unix(payload.exp);

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }
  
  get token(): string {
    return localStorage.getItem('token');
  }

  signIn(obj: User,uri: string){
    return this.http.post( `${this.root_api}${uri}`,obj).pipe(tap(
      response => this.setSession(response)),
    shareReplay(),)
  }

  login(obj: any, uri: string) {
    return this.http.post(`${this.root_api}${uri}`, obj).pipe(
      tap(response => {
        this.setSession(response)
        const enc = btoa(escape(JSON.stringify(response)));
        // encryption
        localStorage.setItem('Encrytion_Token', enc)
      }),
      shareReplay(),
    );
  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  refreshToken() {
    if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
      return this.http.post(`${this.root_api}`+ 'auth/refresh-token/',{ token: this.token }).pipe(
                 tap(response => this.setSession(response)),
                  shareReplay(),
          ).subscribe();
    }
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }


  createProfile(obj){
    console.log(obj)
    return  this.http.post('http://localhost:8000/api/p/',obj)
  }
  updateProfile(obj,id){
    return this.http.put('http://localhost:8000/api/p/'+id+'/',obj)
  }
  

  getIId(){
    let info =  jwt_decode(localStorage.getItem('token'))
    const obj = new FormData();

    let id = info.user_id
    console.log(id)
    return  this.http.get('http://localhost:8000/api/i/'+id +'/')
  }
}
