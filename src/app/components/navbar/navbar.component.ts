import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  clientIsConnected: boolean;
  adminIsConnected: boolean;
  x: boolean;
  id: any;
  userfirstName: String;
  userlastName: String;
  userIsAuthenticated = false;
  adminIsAuthenticated:any;
  clientIsAuthenticated:any;
  private authListenerSubs: Subscription;
  private authClient: Subscription;
  private authAdmin: Subscription;
  role: any;
  profile: any;
  username: string
  user: any;
  profileisSet = false
  constructor(
    private userService: UserService,
    private router: Router, 
    private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.userfirstName = localStorage.getItem("firstName");
    this.userlastName = localStorage.getItem("lastName");
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.getUser(this.id).subscribe((response) => 
      { this.user = response.user });
    this.userIsAuthenticated = this.userService.getIsAuth();
    console.log('here auth', this.userIsAuthenticated);
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
 });
    this.clientIsAuthenticated = this.userService.getIsAuthClient();
    console.log('here auth Client', this.clientIsAuthenticated);
       this.authClient = this.userService .getAuthClient().subscribe(isClient => {
       this.clientIsAuthenticated = isClient;
   });
 
    this.adminIsAuthenticated = this.userService.getIsAuthAdmin();
    console.log('here auth Admin', this.adminIsAuthenticated);
    this.authAdmin = this.userService .getAuthAdmin().subscribe(isAdmin => {
     this.adminIsAuthenticated = isAdmin;
    });

 }

 onLogout() {
 this.userService.logout();
 }

 ngOnDestroy(): void {
  this.authListenerSubs.unsubscribe();
  this.authClient.unsubscribe();
  this.authAdmin.unsubscribe();
  this.role=localStorage.getItem("userRole");

}

userAnnonce(){
  let id= localStorage.getItem("userId");
  this.router.navigate([`dashboard/${id}`]);
}

accountUser(){
  let id= localStorage.getItem("userId");
  this.router.navigate([`account/${id}`]);
}


  //   this.userfirstName = localStorage.getItem("fName");
  //   this.userlastName = localStorage.getItem("lName");
  //   var role = localStorage.getItem("role");
  //   var userConnected = localStorage.getItem("connected" || "0");
  //   if (userConnected != "0") {
  //     this.id = userConnected;
  //   }
  //   if (role === "client") {
  //      this.clientIsConnected = true;
  //      this.adminIsConnected = false;
  //      this.x = false;
  //   } else if (role === "admin") {
  //     this.clientIsConnected = false;
  //     this.adminIsConnected = true;
  //     this.x = false;
  //   }
  //   else{
  //     this.clientIsConnected = false;
  //     this.adminIsConnected = false;
  //     this.x = true;
  //   }
  // }

 
  // logout(){
  //   localStorage.removeItem("role");
  //   localStorage.removeItem("connected");
  //   this.router.navigate([""]);
  // }



}
