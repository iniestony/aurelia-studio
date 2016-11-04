import {inject} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Portal {

  currentNav = "";
  onAfterLoadPortal = null;

  configureRouter(config, router) {
    config.map([
      { route: "/dashboard", name: "dashboard", moduleId: "../dashboard/dashboard", nav: true, title: "首页"}
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