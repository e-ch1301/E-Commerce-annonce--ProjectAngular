import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent implements OnInit {
  
  T:any=[];
  id:any;
  pageOfItems: Array<any>;
    constructor(
      private orderService:OrderService, 
      private router:Router,
      private activatedRoute:ActivatedRoute) { }
  
    ngOnInit() { 
      this.id = this.activatedRoute.snapshot.paramMap.get("id")
      this.orderService.getAllOrders().subscribe((response)=>{
        console.log("here response of all order ", response.orders);
        this.T = response.orders;
      })
    }
  
    goToDisplay(id) {
      this.router.navigate([`orderInfo/${id}`])
    }
  
    deleteOrder(id){
      this.orderService.deleteOrderById(id).subscribe((response)=> {
        console.log('here delete res',response.message)
      });
      this.orderService.getAllOrders().subscribe((response)=> {
        this.T= response.orders;
      });
    }

  onChangePage(x: Array<any>) {
    this.pageOfItems = x;
  }
}
