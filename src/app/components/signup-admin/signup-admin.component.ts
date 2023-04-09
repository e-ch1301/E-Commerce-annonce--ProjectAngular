import { MustMatch } from 'src/app/validators/mustMatch';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.css']
})
export class SignupAdminComponent implements OnInit {

  signupForm: FormGroup
  errorMsg: string;
  imagePreview: any;
 
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private userService: UserService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName:['',[Validators.required,Validators.minLength(3)]],
      lastName:['',[Validators.required, Validators.minLength(5)]],
      tel:['',[Validators.required, Validators.minLength(8)]],
      email:['',[Validators.required, Validators.email]],
      pwd:['',[Validators.required, Validators.minLength(6),  Validators.maxLength(12)]],
      confirmPwd:[''],
      img:[''],
      role: ['admin']
    }, {
      validators:MustMatch("pwd","confirmPwd")
    });
}
signup(){

this.userService.signup(this.signupForm.value, this.signupForm.value.img ).subscribe(
  (data) => {
    console.log("here response after signup", data.message);
    if (data.message == "Email exist") {
      this.errorMsg = "Adresse mail existe";
    } else {
      this.router.navigate(["login"]);
    }
  }
  );
}

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

}
