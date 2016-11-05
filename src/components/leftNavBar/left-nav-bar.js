import {inject, bindable, bindingMode, containerless} from 'aurelia-framework';
import {Router} from "aurelia-router";
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(Router, EventAggregator)
@containerless()
export class LeftNavBar {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) currentNav;

  timeoutID = null;

  toggleSecondNav = (_firstNav, _event) => {
    _firstNav.firstNavOpen = !_firstNav.firstNavOpen;
    (_firstNav.firstNavOpen)
      ?$(_event.target).parents('li.first-nav').find('ul.second-ul').slideDown(300)
      :$(_event.target).parents('li.first-nav').find('ul.second-ul').slideUp(300);
  };

  toggleThirdNav = (_secondNav, _event, _open) => {
    if(_open){
      _secondNav.secondNavOpen = _open;
      $(_event.target).parents('li.second-nav').find('ul.third-ul').slideDown(300);
    }
    else{
      this.timeoutID = setTimeout(() => {
        if(!_secondNav.secondNavBlock){
          _secondNav.secondNavOpen = _open;
          $(_event.target).parents('li.second-nav').find('ul.third-ul').slideUp(300);
        }
      }, 200);
    }
  };

  setNavBlock(_secondNav, _event, _block) {
    _secondNav.secondNavBlock = _block;
    if(!_secondNav.secondNavBlock){
      $(_event.target).slideUp(300);
    }
  }

  navigations = [{
    "firstNavName": "首页",
    "firstNavIcon": "icon-menu",
    "firstNavOpen": false,
    "firstNavCallback": () => {}
  },{
    "firstNavName": "产品与服务",
    "firstNavIcon": "icon-arrow",
    "firstNavOpen": false,
    "firstNavCallback": this.toggleSecondNav,
    "secondNavs": [{
      "secondNavName": "TDH服务",
      "secondNavIcon": "icon-settings",
      "secondNavOpen": false,
      "secondNavCallback": () => {}
    },{
      "secondNavName": "Transwarp Studio",
      "secondNavIcon": "icon-settings",
      "secondNavOpen": false,
      "secondNavBlock": false,//if open is blocked
      "secondNavCallback": this.toggleThirdNav,
      "thirdNavs": [{
        "thirdNavName": "报表",
        "thirdNavIcon": "icon-settings",
        "thirdNavCallback": () => {}
      },{
        "thirdNavName": "Notebook",
        "thirdNavIcon": "icon-settings",
        "thirdNavCallback": () => {}
      },{
        "thirdNavName": "分析",
        "thirdNavIcon": "icon-settings",
        "thirdNavCallback": () => {}
      },{
        "thirdNavName": "工作流",
        "thirdNavIcon": "icon-settings",
        "thirdNavCallback": () => {}
      },{
        "thirdNavName": "OLAP",
        "thirdNavIcon": "icon-settings",
        "thirdNavCallback": () => {}
      },{
        "thirdNavName": "元数据",
        "thirdNavIcon": "icon-settings",
        "thirdNavCallback": () => {}
      },{
        "thirdNavName": "TDT",
        "thirdNavIcon": "icon-settings",
        "thirdNavCallback": () => {}
      },{
        "thirdNavName": "BulkLoad",
        "thirdNavIcon": "icon-settings",
        "thirdNavCallback": () => {}
      },{
        "thirdNavName": "HDFS浏览",
        "thirdNavIcon": "icon-settings",
        "thirdNavCallback": () => {}
      },{
        "thirdNavName": "Transpedia",
        "thirdNavIcon": "icon-settings",
        "thirdNavCallback": () => {}
      }]
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
      "secondNavCallback": () => {}
    },{
      "secondNavName": "用户",
      "secondNavIcon": "icon-settings",
      "secondNavOpen": false,
      "secondNavCallback": () => {}
    },{
      "secondNavName": "角色",
      "secondNavIcon": "icon-settings",
      "secondNavOpen": false,
      "secondNavCallback": () => {}
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
      "secondNavCallback": () => {}
    },{
      "secondNavName": "工单",
      "secondNavIcon": "icon-settings",
      "secondNavOpen": false,
      "secondNavCallback": () => {}
    }]
  }];

  constructor(router, ea) {
    this.router = router;
    this.eventAggregator = ea;
  }
  
  attached() {
    console.log(this.currentNav);
  }

  detached(){
    if(this.timeoutID){
      clearTimeout(this.timeoutID)
    }
  }
  
  navigate(name) {
    this.router.navigateToRoute(name);
  }
}
