import { UserService } from 'src/app/services/user.service';
import { AnnonceService } from './../../services/annonce.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  annonceForm: FormGroup;
  annonce: any={};
  id:any;
  actualDate : any = new Date();
  imagePreview: any;
  userId:any;
  user : any={} ;
  fullDate: any;
  
  constructor(
    private activatedRoute: ActivatedRoute , 
    private router:Router,
    private annonceService: AnnonceService,
    private formBuilder:FormBuilder) { }
 
    ngOnInit() {
      this.actualDate = new Date() 
      this.userId = localStorage.getItem("userId")
      console.log("here user id",this.user.id);
      this.annonceForm = this.formBuilder.group({
        productName:['',[Validators.required]],
        category:[''],
        price:['',[Validators.required]],
        qty: ['', [Validators.email,Validators.min(1)] ],
        description:['',[Validators.required]],
        img: [''],
    });
}

  addProduct(){
    var d = new Date();
    var date = d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate();
    this.fullDate = date;
    this.annonceForm.value.date= this.fullDate;
    this.annonceForm.value.userId= this.userId;
    console.log("here date",this.annonceForm.value.date)
      this.annonceService.addProduct(this.annonceForm.value, this.annonceForm.value.img).subscribe(
        (response)=>{
        console.log("here response after add annonce",response.message);});
      this.router.navigate(['']);
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
}
