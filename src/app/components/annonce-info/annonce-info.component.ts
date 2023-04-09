import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from './../../services/order.service';
import { AnnonceService } from './../../services/annonce.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-annonce-info',
  templateUrl: './annonce-info.component.html',
  styleUrls: ['./annonce-info.component.css']
})
export class AnnonceInfoComponent implements OnInit {

  id:any;
  userId: any;
  annonce: any = {};
  orderForm: FormGroup;
  
  
   constructor(private annonceService:AnnonceService, 
    private activatedRoute:ActivatedRoute,
    private formBuilder: FormBuilder,
    private orderService:OrderService,
    private router:Router) { }
 
   ngOnInit() {
     this.userId = localStorage.getItem("userId");
     console.log("here user id",this.userId); 
     this.orderForm=this.formBuilder.group ({
       qty: ['', [Validators.required,Validators.min(1)]],    
   });
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
     this.annonceService.displayAnnonceById(this.id).subscribe((response)=>{
         this.annonce = response.annonce;
         console.log("here annonce", this.annonce)
     });
   }
   AddOrder(){
    this.orderForm.value.userId= this.userId;
     this.orderForm.value.annonceId= this.id;
     
     console.log("here order", this.orderForm.value)
     this.orderService.addOrder(this.orderForm.value).subscribe();
     this.router.navigate(['']);
 
   }
}
