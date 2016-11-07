import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";

@inject(Router)
export class Ticket {
  
  constructor(r) {
    this.router = r;
  }
  
  attached() {
    
  }
}