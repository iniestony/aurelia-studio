import {inject, bindable, bindingMode, containerless} from 'aurelia-framework';
import {Router} from "aurelia-router";
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(Router, EventAggregator)
@containerless()
export class LeftNavBar {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) currentNav;

  constructor(router, ea) {
    this.router = router;
    this.eventAggregator = ea;
  }
  
  attached() {
    console.log(this.currentNav);
  }
  
  navigate(name) {
    this.router.navigateToRoute(name);
  }
}
