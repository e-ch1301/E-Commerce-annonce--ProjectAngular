import { AnnonceService } from './../../services/annonce.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-annonces-table',
  templateUrl: './annonces-table.component.html',
  styleUrls: ['./annonces-table.component.css']
})
export class AnnoncesTableComponent implements OnInit {

  annonces : any = [];
  id: any;
  pageOfItems: Array<any>;
  constructor(
    private router: Router,
    private annonceService: AnnonceService,
    ) { }

  ngOnInit() {   
    this.annonceService.displayAllAnnonces().subscribe((response)=> {
        this.annonces = response.annonces;
         });
  }
  
  goToDisplay(id){
    //localStorage.setItem("annonceInfoId",id);
    this.router.navigate([`annonceInfo/${id}`]);
  }

  deleteAnnonce(id){
    this.annonceService.deleteAnnonce(id).subscribe((response)=> {
      console.log('here delete res',response.message)
    });
    this.annonceService.displayAllAnnonces().subscribe((response)=> {
      this.annonces = response.annonces;
    });
  }
  
  goToEdit(x) {
    this.router.navigate([`editProduct/${x}`])
  }

  onChangePage(x: Array<any>) {
    this.pageOfItems = x;
  }
}
