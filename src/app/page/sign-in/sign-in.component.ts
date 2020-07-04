import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private src : HttpService, private route: Router) { }

  ngOnInit(): void {
  }

  obj:any={
    username:'',
    password:''
  }

  onLoginButtonClick(){
    if(this.obj.username.length> 0 && this.obj.password.length> 0){
      this.src.login(this.obj,'auth/login/').subscribe(res=>{
        console.log(res)
        this.route.navigate(['re_profile'])
    })}else{
      console.log('plese put write infomation plese fill both the field ')
    }
  }
}
