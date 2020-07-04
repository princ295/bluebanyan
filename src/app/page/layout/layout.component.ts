import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private src: HttpService, private route: Router) { }

  img: any = null;
  ngOnInit(): void {
    this.src.getIId().subscribe(res=>{
      // http://localhost:8000/media/media/profile_pics/brickshare-card-source-expand-collapse-x4_dV1Of9J.jpg
      

      // http://localhost:8000/media/media/profile_pics/brickshare-card-source-expand-collapse-x4_dV1Of9J.jpg

      // http://localhost:8000/media/profile_pics/WhatsApp-Image-2020-04-02-at-9.32.47-AM-322x234_uVhVzu3.jpeg
      console.log(res)
      if(res[0].fields.image!=null){
        this.img = 'http://localhost:8000/media/'+res[0].fields.image
        console.log(this.img)
      }

      console.log('-----------------=============------------')
    })
  }

  async logout(){
 
    await setTimeout(()=>{
      this.route.navigateByUrl('U/s_in')
      },2000)
    }
}
