import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-last-annonce',
  templateUrl: './last-annonce.component.html',
  styleUrls: ['./last-annonce.component.css']
})
export class LastAnnonceComponent implements OnInit {
  T: any;
  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit() {
//     this.homeService.getLastAnnonce().subscribe((data)=>{
//       this.T = data.annonce;
// })}; 

  }
}
