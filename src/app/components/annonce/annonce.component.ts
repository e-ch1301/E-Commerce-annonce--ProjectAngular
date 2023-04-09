import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent implements OnInit {

  @Input() annonce: any
  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  goToDisplay(id) {
    this.router.navigate([`annonceInfo/${id}`]);
  }
 
}

