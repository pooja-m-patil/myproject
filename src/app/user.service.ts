import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  private username;
  private ishide;
  private key='';

  constructor(private router:Router) {
    this.isUserLoggedIn=false;
    this.key='';
    this.username='admin';
   
   }

   setUserLoggedIn() {
     this.isUserLoggedIn=true;
    
   }

   getuserLoggedin() {
     return this.isUserLoggedIn;
     
   }

   setLog() {
    //this.isUserLoggedIn=true;
    localStorage.setItem(this.key, 'navbar');
  }

  getLog() {
    //return this.isUserLoggedIn;
    return localStorage.getItem(this.key);
  }

  logout() {
    //return this.isUserLoggedIn;
    console.log("logout");
    return localStorage.removeItem(this.key);
    
  }

   setHideFetch(){
     this.ishide=false;
   }

   getHideFetch(){
    return this.ishide;
  }

  setWelcome(uname){
    localStorage.setItem(this.username, uname);
  }

  getWelcome(){
    return localStorage.getItem(this.username);
 }
}
