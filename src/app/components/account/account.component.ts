import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  id: any;
  userInfo: any;
  constructor(
    private userService: UserService, 
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.userService.getProfile(this.id).subscribe(
      (response) => {
         console.log();
         this.userInfo = response.user;
      })
  }

  userAnnonce(){
    let id= localStorage.getItem("userId");
    this.router.navigate([`dashboard/${id}`]);
  }
}
