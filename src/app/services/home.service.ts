import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  homeUrl: string = "http://localhost:3000/home";

  constructor(private http: HttpClient) { }

  // getLastAnnonce(){
  //   return this.http.get<{annonce: any }>(this.homeUrl);
  // }
}
