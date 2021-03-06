import {inject, bindable, bindingMode, containerless} from 'aurelia-framework';
import {Router} from "aurelia-router";
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(Router, EventAggregator)
@containerless()
export class TopSearchBar {
  
  showUserInfo = false;
  
  username = "support@transwarp.io";
  alerts = 23;

  toggleMenu() {
    this.showUserInfo = !this.showUserInfo;
  }
  
  closeMenu() {
    this.showUserInfo = false;
  }

  constructor(router, ea) {
    this.router = router;
    this.eventAggregator = ea;
  }

  attached() {

  }
  
  personalConfigure() {
    console.log("personalConfigure");
  }

  logout() {
    console.log("logout");
  }
}
