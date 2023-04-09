import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  annonceUrl: string = "http://localhost:3000/annonces";


  constructor(private http: HttpClient) { }

  addProduct(product:any, img: File) {
    let formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("qty", product.qty);
    formData.append("description", product.description);
    formData.append("date", product.date);
    formData.append("userId", product.userId);
    formData.append("img", img);
    return this.http.post<{ message: string, annonce: any }>(this.annonceUrl, formData);
  }

  editProduct(newObj) {
    return this.http.put<{ message: string }>(`${this.annonceUrl}/${newObj._id}`, newObj)
  }

  displayAnnonceById(id) {
    return this.http.get<{annonce: any }>(`${this.annonceUrl}/${id}`);
  }

  deleteAnnonce(id) {
    return this.http.delete<{message: string, isDeleted: boolean }>(`${this.annonceUrl}/${id}`);
  }

  displayAllAnnonces() {
    return this.http.get<{annonces: any }>(this.annonceUrl);
  }

  getAnnonceByUser(id){
    return this.http.get<{annonces:any}>(`${this.annonceUrl}/${id}`);
  }



}
