import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AnnonceService } from 'src/app/services/annonce.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  id:any;
  product:any={};
  annonceForm:FormGroup;
  imagePreview: any;
  constructor(
    private annonceService:AnnonceService, 
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.annonceForm = this.formBuilder.group({
      productName:['',[Validators.required]],
      category:[''],
      price:['',[Validators.required]],
      qty: ['', [Validators.email,Validators.min(1)] ],
      description:['',[Validators.required]],
      img: [''],
  });
 
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.annonceService.displayAnnonceById(this.id).subscribe((response)=>{
      this.product = response.annonce;
    });
  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.annonceForm.patchValue({ img: file });
    this.annonceForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }

    editProduct(){
      this.annonceService.editProduct(this.product).subscribe((response)=>{
        console.log("here response after edit",response.message);
        
      })
      this.router.navigate(['']);
    }

}
