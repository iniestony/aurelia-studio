import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";

@inject(Router)
export class Homepage {

  constructor(r) {
    this.router = r;
  }

  attached() {
    
  }
}