import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';

import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-profile',
  templateUrl: './register-profile.component.html',
  styleUrls: ['./register-profile.component.scss']
})
export class RegisterProfileComponent implements OnInit {

  constructor(private src: HttpService, private route: Router) { }


  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  obj:any={
    fileData: '',
    firstname:'',
    lastname:'',
    address: '',
  }
  ngOnInit(): void {
    this.src.getIId().subscribe(res=>{
      console.log(res)
    })
  }
  fileProgress(fileInput: any) {
        this.fileData = <File>fileInput.target.files[0];
        this.preview();
  }
  
  preview() {
      // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
   }
 
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
  }
 
  onSubmit() {
    let info =  jwt_decode(localStorage.getItem('token'))
    let id = info.user_id
    const obj = new FormData();

    obj.append('image',this.fileData)
    obj.append('firstname',this.obj.firstname)
    obj.append('lastname',this.obj.lastname)

    obj.append('address',this.obj.address)
    obj.append('user',id)

    console.log(info.user_id)
    this.src.createProfile(obj).subscribe(res=>{
      alert('your profile register sucessfully..........')
      this.route.navigate([''])
    })

  }

}
