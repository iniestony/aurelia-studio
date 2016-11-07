import {inject} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Portal {

  currentNav = "";
  onAfterLoadPortal = null;

  configureRouter(config, router) {
    config.map([
      { route: "/homepage", name: "homepage", moduleId: "../homepage/homepage", nav: true, title: "首页"},
      { route: "/ticket", name: "ticket", moduleId: "../ticket/ticket", nav: true, title: "工单"}
    ]);

    this.router = router;
  }

  constructor(ea) {
    this.eventAggregator = ea;
    this.onAfterLoadPortal = this.eventAggregator.subscribe('router:navigation:complete', () => {
      for(let i=0;i<this.router.routes.length;i++){
        if(this.router.routes[i].navModel.isActive){
          this.currentNav = this.router.routes[i].name;
          break;
        }
      }
    });
  }

  attached() {

  }
  
  detached() {
    this.onAfterLoadPortal.dispose();
  }
}