import {inject, bindable, bindingMode, containerless} from 'aurelia-framework';
import {Router} from "aurelia-router";
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(Router, EventAggregator)
@containerless()
export class LeftNavBar {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) currentNav;

  toggleSecondNav = (_index, _event) => {
    this.navigations[_index].firstNavOpen = !this.navigations[_index].firstNavOpen;
    (this.navigations[_index].firstNavOpen)
      ?$(_event.target).parents('li.first-nav').find('ul').slideDown(300)
      :$(_event.target).parents('li.first-nav').find('ul').slideUp(300);
  };

  navigations = [{
    "firstNavName": "首页",
    "firstNavIcon": "icon-menu",
    "firstNavOpen": false,
    "firstNavCallback": () => {},
    "secondNavs": []
  },{
    "firstNavName": "产品与服务",
    "firstNavIcon": "icon-arrow",
    "firstNavOpen": false,
    "firstNavCallback": this.toggleSecondNav,
    "secondNavs": [{
      "secondNavName": "TDH服务",
      "secondNavIcon": "icon-settings",
      "secondNavOpen": false,
      "secondNavCallback": () => {},
      "thirdNavs": []
    },{
      "secondNavName": "Transwarp Studio",
      "secondNavIcon": "icon-settings",
      "secondNavOpen": false,
      "secondNavCallback": () => {},
      "thirdNavs": []
    },{
      "secondNavName": "数据资产",
      "secondNavIcon": "icon-settings",
      "secondNavOpen": false,
      "secondNavCallback": () => {},
      "thirdNavs": []
    },{
      "secondNavName": "项目资产",
      "secondNavIcon": "icon-settings",
      "secondNavOpen": false,
      "secondNavCallback": () => {},
      "thirdNavs": []
    },{
      "secondNavName": "应用市场",
      "secondNavIcon": "icon-settings",
      "secondNavOpen": false,
      "secondNavCallback": () => {},
      "thirdNavs": []
    },{
      "secondNavName": "模型商店",
      "secondNavIcon": "icon-settings",
      "secondNavOpen": false,
      "secondNavCallback": () => {},
      "thirdNavs": []
    }]
  },{
    "firstNavName": "管理",
    "firstNavIcon": "icon-arrow",
    "firstNavOpen": false,
    "firstNavCallback": this.toggleSecondNav,
    "secondNavs": [{
      "secondNavName": "租户",
      "secondNavIcon": "icon-settings",
      "secondNavOpen": false,
      "secondNavCallback": () => {},
      "thirdNavs": []
    },{
      "secondNavName": "用户",
      "secondNavIcon": "icon-settings",
      "secondNavOpen": false,
      "secondNavCallback": () => {},
      "thirdNavs": []
    },{
      "secondNavName": "角色",
      "secondNavIcon": "icon-settings",
      "secondNavOpen": false,
      "secondNavCallback": () => {},
      "thirdNavs": []
    }]
  },{
    "firstNavName": "个人",
    "firstNavIcon": "icon-arrow",
    "firstNavOpen": false,
    "firstNavCallback": this.toggleSecondNav,
    "secondNavs": [{
      "secondNavName": "消息",
      "secondNavIcon": "icon-settings",
      "secondNavOpen": false,
      "secondNavCallback": () => {},
      "thirdNavs": []
    },{
      "secondNavName": "工单",
      "secondNavIcon": "icon-settings",
      "secondNavOpen": false,
      "secondNavCallback": () => {},
      "thirdNavs": []
    }]
  }];

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
