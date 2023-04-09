import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-annonces-client-table',
  templateUrl: './annonces-client-table.component.html',
  styleUrls: ['./annonces-client-table.component.css']
})
export class AnnoncesClientTableComponent implements OnInit {

  annoncesTab: any = [];
  userId: any;
  id:any;
  pageOfItems: Array<any>;
  
  
  constructor(
    private annonceService:AnnonceService,
    private activatedRoute:ActivatedRoute, 
    private router:Router) { }
  
    ngOnInit() {
       this.id = this.activatedRoute.snapshot.paramMap.get('id');
       this.annonceService.displayAllAnnonces().subscribe((response)=> {
        var user = localStorage.getItem("userId");
        var j = 0;
        for (let i = 0; i < response.annonces.length; i++) {
          if (response.annonces[i].userId == user) {
            this.annoncesTab[j] = response.annonces[i];
          }
          
          
        }
          
        });
     }

    goToDisplay(id){
      this.router.navigate([`annonceInfo/${id}`]);
    }
     
    goToEdit(id){
      this.router.navigate([`editAnnonce/${id}`])
  
    }
  
    deleteAnnonce(id){
      this.annonceService.deleteAnnonce(id).subscribe((response)=> {
        console.log('here delete res',response.message)
      });
      this.annonceService.getAnnonceByUser(this.id).subscribe((response)=> {
        this.annoncesTab = response.annonces;
      });
    }
    
    onChangePage(x: Array<any>) {
      this.pageOfItems = x;
    }
    
}
