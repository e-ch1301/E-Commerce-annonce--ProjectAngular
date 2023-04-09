import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-client-table',
  templateUrl: './orders-client-table.component.html',
  styleUrls: ['./orders-client-table.component.css']
})
export class OrdersClientTableComponent implements OnInit {

  orders: any = [];
  id: any;
  pageOfItems: Array<any>;
  constructor(
  private orderService:OrderService,
  private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.orderService.getOrderByUser(this.id).subscribe((response)=> {
      this.orders = response.order;
      console.log("fffff",response.order[1].annonce[0].price)
      console.log("here order",this.orders);
     } );
      
     
    }

  deleteOrder(id){
    this.orderService.deleteOrderById(id).subscribe((response)=> {
      console.log('here delete res',response.message)
    });
    this.orderService.getOrderByUser(this.id).subscribe((response)=> {
      this.orders= response.order;
    });
  }

  onChangePage(x: Array<any>) {
    this.pageOfItems = x;
  }
  
}
