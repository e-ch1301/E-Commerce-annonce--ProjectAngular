import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product-test',
  templateUrl: './add-product-test.component.html',
  styleUrls: ['./add-product-test.component.css']
})
export class AddProductTestComponent implements OnInit {

  productForm: FormGroup;
  product: any = {};
  categories: any = {};
  products: any = [];
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.products = JSON.parse(localStorage.getItem("products") || "[]");

    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: [
        this.categories = JSON.parse(localStorage.getItem("categories" || "[]"))
      ],
    });
    this.products = JSON.parse(localStorage.getItem("products" || "[]"));

  }

  addProduct() {

    let productId = JSON.parse(localStorage.getItem("productId") || "1");
    this.productForm.value.id = productId;
    this.products.push(this.productForm.value);
    localStorage.setItem("products", JSON.stringify(this.products));
    localStorage.setItem("productId", productId + 1);

  }
}


