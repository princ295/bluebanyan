import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CovidService } from 'src/app/service/covid.service';

import { Model } from 'src/model/country';
import { State } from 'src/model/state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-covid-dashboard',
  templateUrl: './covid-dashboard.component.html',
  styleUrls: ['./covid-dashboard.component.scss']
})
export class CovidDashboardComponent implements OnInit {

  _: Observable<any[]>;
  id: number = 19;

  obj: Model = new Model()
  info: State = new State()

  constructor(private covid: CovidService, private route: Router) { }

  ngOnInit(): void {

    if(confirm('Please Update your profile if you alrady have done then ignore this press cancel button:)')){
      this.route.navigate(['up_profile'])
    }
    
    this._ = this.covid.getPeople();

    this.covid.getCountry().subscribe((info)=>{
      this.covid.getState('Chhattisgarh').subscribe((res)=>{
        this.obj = info
        this.info = res
      })
    })
  }

  onchange(obj: any){
    this.covid.getState(obj.state).subscribe((info)=>{
      this.info = info
    })
  }

}
