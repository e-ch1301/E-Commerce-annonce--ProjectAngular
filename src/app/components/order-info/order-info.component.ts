import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit {

  id: any;
  O: any = [];
    constructor(
      private orderService: OrderService, 
      private activatedRoute:ActivatedRoute) { }
  
    ngOnInit() {
       this.id = this.activatedRoute.snapshot.paramMap.get('id');
       this.orderService.getOrderById(this.id).subscribe((response)=>{
        console.log("here display order",response.order);
        this.O = response.order;
      })
    }
  

}
