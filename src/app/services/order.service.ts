
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderUrl: string = "http://localhost:3000/orders"

  constructor(private http: HttpClient) { }

  addOrder(obj) {
    return this.http.post<{ message: string, annonce:any }>(this.orderUrl, obj);
  }
  
  getAllOrders(){
    return this.http.get<{orders: any}>(this.orderUrl);
   }
  
  deleteOrderById(id){
    return this.http.delete<{ message:string}>(`${this.orderUrl}/${id}`);
  }

  getOrderById(id) {
     return this.http.get<{order:any}>(`${this.orderUrl}/${id}`);
  }

  getOrderByUser(id){
    return this.http.get<{order:any}>(`${this.orderUrl}/${id}`);
  }
}
