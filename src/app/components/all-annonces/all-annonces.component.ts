import { AnnonceService } from './../../services/annonce.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-annonces',
  templateUrl: './all-annonces.component.html',
  styleUrls: ['./all-annonces.component.css']
})
export class AllAnnoncesComponent implements OnInit {
  
  T: any = [];
  pageOfItems: Array<any>;
  constructor(
    
    private annonceService: AnnonceService) { }
    
  ngOnInit() {
    this.annonceService.displayAllAnnonces().subscribe((data)=>{
      this.T = data.annonces;
    })
  }

  onChangePage(x: Array<any>) {
    this.pageOfItems = x;
    }
    
   
  
  }

