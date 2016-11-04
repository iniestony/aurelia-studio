import {inject} from "aurelia-framework";

export class Portal {

  configureRouter(config, router) {

    config.map([
      { route: ["/dashboard"], name: "dashboard", moduleId: "../dashboard/dashboard", nav: true, title: "首页"}
    ]);

    this.router = router;
  }
}