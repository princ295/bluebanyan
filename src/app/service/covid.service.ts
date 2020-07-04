import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';

import { delay, map, catchError } from 'rxjs/operators';
import { Model } from 'src/model/country';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private http: HttpClient) { }

  _: Model = new Model()

  getCountry(): Observable<any>{
    return this.http.get('https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise').pipe(
      map((_: any) => {
        this._ = _.data.total;
        this._.lastRefreshed = _.data.lastRefreshed
        return this._;
      }), catchError( error => {
        return throwError( 'Something went wrong!' );
      })
    )
  }


  getState(info:string){
    return this.http.get('https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise').pipe(
      map((_: any) => {
        _ = _.data.statewise.filter((obj)=>{
          return obj.state == info
        })
        return _[0];
      }), catchError( error => {
        return throwError( 'Something went wrong!' );
      })
    )
  }

  signIn(): Observable<any>{
    return 
  }


  getinfo(term: string = null): Observable<any[]> {
    let items = getinfocountry();
    // if (term) {
    //     items = items.filter(x => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
    // }
    return of(items).pipe(delay(500));
}
}



function getinfocountry() {
  return [
      {
        "id": 2,
        "state": "Tamil Nadu",
      },
      {
        "id": 3,
        "state": "Delhi",
      },
      {
        "id": 4,
        "state": "Gujarat",
      },
      {
        "id": 5,
        "state": "Uttar Pradesh",
      },
      {
        "id": 6,
        "state": "Rajasthan",
      },
      {
        "id": 7,
        "state": "West Bengal",
      },
      {
        "id": 8,
        "state": "Maharashtra"
      },
      {
        "id": 9,
        "state": "Madhya Pradesh",
      },
      {
        "id": 10,
        "state": "Karnataka",
      },
      {
        "id": 11,
        "state": "Andhra Pradesh",
      },
      {
        "id": 12,
        "state": "Bihar",
      },
      {
        "id": 13,
        "state": "Telangana",
      },

      {
        "id": 14,
        "state": "Jammu and Kashmir",
      },
      {
        "id": 15,
        "state": "Assam",
      },
      {
        "id": 16,
        "state": "Punjab",
      },
      {
        "id": 17,
        "state": "Kerala",
      },

      {
        "id": 18,
        "state": "Uttarakhand",
      },
      {
        "id": 19,
        "state": "Chhattisgarh",
      },

      {
        "id": 20,
        "state": "Jharkhand",
      },
      {
        "id": 21,
        "state": "Tripura",
      },
      {
        "id": 22,
        "state": "Ladakh",
      },
      {
        "id": 23,
        "state": "Goa",
      },
      {
        "id": 24,
        "state": "Himachal Pradesh",
      },
      {
        "id": 25,
        "state": "Manipur",
      },
      {
        "id": 26,
        "state": "Chandigarh",
      },
      {
        "id": 27,
        "state": "Puducherry",
      },
      {
        "id": 28,
        "state": "Nagaland",
      },
      {
        "id": 29,
        "state": "Mizoram",
      },
      {
        "id": 30,
        "state": "Arunachal Pradesh",
      },
      {
        "id": 31,
        "state": "Sikkim",
      },
      {
        "id": 32,
        "state": "Dadra and Nagar Haveli",
      },
      {
        "id": 33,
        "state": "Andaman and Nicobar Islands",
      },
      {
        "id": 34,
        "state": "Meghalaya",
      },
      {
        "id": 35,
        "state": "Lakshadweep",
      },
  ]
}