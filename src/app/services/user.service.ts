import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthData } from '../../../backend/models/user.js';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAuthenticated = false;
  private isClient = false;
  private isAdmin = false;
  private statut: any;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private userRole: string;
  private authStatusListener = new Subject<boolean>();
  private authClient = new Subject<boolean>();
  private authAdmin = new Subject<boolean>();

  public err = new BehaviorSubject<any>(null);

  userUrl: string = "http://localhost:3000/users"

  constructor(private http: HttpClient, private router: Router) {
    var currentUser = (localStorage.getItem('userId'))
    if (currentUser === null) {
      this.isAuthenticated = false;
    } else {
      this.isAuthenticated = true;
      var currentUser = (localStorage.getItem('userRole'))
      if (currentUser === "client") {
        this.isClient = true;
      } else {
        this.isAdmin = true;
        
      }
    }


  }
  signup(user:any, img:File){
    let formData = new FormData ();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("tel", user.tel);
    formData.append("adress", user.adress);
    formData.append("email", user.email);
    formData.append("pwd", user.pwd);
    formData.append("img", img);
    formData.append("role", user.role);
    formData.append("statut", user.statut);
    return this.http.post<{message: string}>(`${this.userUrl}/signup`, formData);
  }

  // signupAdmin(user:any, img:File){
  //   let formData = new FormData ();
  //   formData.append("firstName", user.firstName);
  //   formData.append("lastName", user.lastName);
  //   formData.append("tel", user.tel);
  //   formData.append("email", user.email);
  //   formData.append("pwd", user.pwd);
  //   formData.append("img", img);
  //   formData.append("img", user.role);
  //   return this.http.post<{message: string}>(`${this.userUrl}/signupAdmin`, formData);
  // }

  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  getUserId() {
    return this.userId;
  }
  getRole() {
    return this.userRole;
  }
  getIsAuthClient() {
    return this.isClient;
  }
  getIsAuthAdmin() {
    return this.isAdmin;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getAuthClient() {
    return this.authClient.asObservable();
  }

  getStatut() {
    return this.statut;
}
  getAuthAdmin() {
    return this.authAdmin.asObservable();
  }

  login(email: string, pwd: string) {
    const authData: AuthData = { email: email, pwd: pwd };

        return this.http
            .post<{
                token: string; expiresIn: number, userId: string,
                userRole: string,
            }>(`${this.userUrl}/login`, authData)
            .pipe(map(response => {
                this.err.next(null)
                const token = response.token;
                this.token = token;
                if (response.userRole === "client") {
                    this.isClient = true;
                    this.authClient.next(true);
                }
                else {
                    this.isAdmin = true;
                    this.authAdmin.next(true);
                }
                if (token) {
                    const expiresInDuration = response.expiresIn;
                    this.setAuthTimer(expiresInDuration);
                    this.isAuthenticated = true;
                    this.userId = response.userId;
                    this.userRole = response.userRole;

                    this.authStatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() +
                        expiresInDuration * 1000);
                    this.saveAuthData(token, expirationDate, this.userId, this.userRole);
                    if (response.userRole === 'admin') {
                        this.router.navigate(["/dashboardAdmin"]);
                    } else {
                        this.router.navigate([""]);
                    }
                    return response.token

                }
            },
                err => {
                    this.err.next(err)

                }));
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.isClient = false;
        this.isAdmin = false;

        this.authStatusListener.next(false);
        this.authClient.next(false);
        this.authAdmin.next(false);

        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate([""]);
    }
    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() -
            now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.userId = authInformation.userId;
            this.userRole = authInformation.userRole;

            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }
    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const userId = localStorage.getItem("userId");
        const userRole = localStorage.getItem("userRole");

        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId,
            userRole: userRole,

        }
    }
    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }
    private saveAuthData(token: string, expirationDate: Date, userId:
        string, userRole: string,) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        localStorage.setItem("userId", userId);
        localStorage.setItem("userRole", userRole);

    }
    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");

    }
  
    // Get User Profile Information 
    getProfile(id:any){
      return this.http.get<{user:any}>(this.userUrl + `/account/${id}`);
    }
    
    getUser(id) {
      return this.http.get<{ user: any }>(`${this.userUrl}/${id}`);

    }
  
  }