import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  users: any = {};
  user: any = {};
  errorMsg: string;
  
  
 

  constructor(
    private router: Router, 
    private userService: UserService) { }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.user.email, this.user.pwd).subscribe((response) => {
      console.log("res", response);


      if (!response) {

        this.errorMsg = "Login failed. Check the user name and password";

      }


    })


  }
    // let user = {email: this.email, pwd: this.pwd}
    // this.userService.login(this.user).subscribe((response)=>{
    //  console.log("here response after login", response);
    //  if (response.message !="1") {
    //     this.errorMsg ="Merci de vérifier votre email ou/et votre mot de passe";
    //  }
    //  else {
    //   this.users = response.user;
    //    this.router.navigate([""]);
    //    localStorage.setItem("role", response.user.role);
    //    localStorage.setItem("connected", response.user.id);
    //    localStorage.setItem("connectedUser",JSON.stringify(response.user));
    //  }
    // })
}
// this.userService.login(this.user).subscribe((response)=>{
//   console.log("here response after login", response);
//   if (response.message !="1") {
//   //  if (response.user.role == "admin") {
//   //            this.router.navigate(['']);
//   //          } else {
//   //            this.router.navigate(['']);
//   //          }
//   //   //please check email/pwd
//     this.errorMsg ="Please check email/Pwd";
//   }
//   else {
//     localStorage.setItem("connectedUser",JSON.stringify(response.user));
//     this.router.navigate(["anononces"]);
//   }
//  })
    

    



