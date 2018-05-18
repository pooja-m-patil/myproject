import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  private username;
  private ishide;
  private key="";

  constructor() {
    this.isUserLoggedIn=false;
   }

   setUserLoggedIn() {
     this.isUserLoggedIn=true;
    
   }

   getuserLoggedin() {
     return this.isUserLoggedIn;
     
   }

   setLog() {
    //this.isUserLoggedIn=true;
    localStorage.setItem(this.key, 'true');
  }

  getLog() {
    //return this.isUserLoggedIn;
    return localStorage.getItem(this.key);
  }

   setHideFetch(){
     this.ishide=false;
   }

   getHideFetch(){
    return this.ishide;
  }
}
