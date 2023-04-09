import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category-test',
  templateUrl: './add-category-test.component.html',
  styleUrls: ['./add-category-test.component.css']
})
export class AddCategoryTestComponent implements OnInit {
  
  categoryForm: FormGroup;
  category: any = {};
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      categoryName:['',[Validators.required]],
      
  });
  }
   addCategory(){
    let categoryId = JSON.parse(localStorage.getItem("categoryId") || "1");
     let categories = JSON.parse(localStorage.getItem("categories") || "[]");
     this.categoryForm.value.id = categoryId;
     categories.push(this.categoryForm.value);
      localStorage.setItem("categoryId", categoryId + 1);
      localStorage.setItem("categories", JSON.stringify(categories));
   }

}
