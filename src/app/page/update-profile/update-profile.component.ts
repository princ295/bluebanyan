import { Component, OnInit } from '@angular/core';

import * as jwt_decode from "jwt-decode";
import { HttpService } from 'src/app/service/http.service';
import { Profile } from 'src/model/profile';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  constructor(private src: HttpService) { }

  img:any =null


  obj: Profile = new Profile();


  fileData: any = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
 
  ngOnInit(): void {
    this.src.getIId().subscribe(res=>{
      this.obj = res[0].fields
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
    this.src.getIId().subscribe(res=>{
      let id = res[0].pk
      this.src.updateProfile(obj,id).subscribe(res=>{
        alert('you data update sucessfully.......')
      })
    })


  }
}
