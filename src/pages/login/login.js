import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";

@inject(Router)
export class Login {
  
  constructor(r) {
    this.router = r;
  }
  
  attached() {
    
  }
  
  login() {
    this.router.navigate("/portal/dashboard");
  }
  
  
  
}