import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from 'src/pwd';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private formbuilder: FormBuilder, private sec: HttpService, private router: Router) { }


  register: FormGroup;
  submit:boolean= false;

  public errCallBack= (errRes: HttpErrorResponse)=>{
    if(errRes.error instanceof Error){
      // this.toastr.error('Error!', 'Client Side Error getting');
    }
    else{
      // this.toastr.error('Error!', 'Client Side Error getting');
    }
  }

  ngOnInit(): void {

    this.register= this.formbuilder.group({
      // Username, email, password 
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', Validators.required]
    },{
      validator: MustMatch('password1', 'password2')
    })
  }

  get f() { return this.register.controls; }


  onSubmit() {
    console.log(this.register.value)
    this.submit = true;
    if (this.register.invalid) {
        return;
    }

    this.sec.signIn(this.register.value, 'auth/signup/').subscribe(res=>{
      if(res){
        alert('Please register your profile')
        this.router.navigate(['re_profile'])
      }else{
        alert('Registration fail! Geting Server Side Error ');
      }
    },this.errCallBack)
    console.log('Every thing is fine now.........')
  }
}
