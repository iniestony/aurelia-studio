import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";

@inject(Router)
export class Dashboard {

  constructor(r) {
    this.router = r;
  }

  attached() {
    
  }
}