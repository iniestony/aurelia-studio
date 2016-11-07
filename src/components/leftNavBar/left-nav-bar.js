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
      let _offsetTop = $(_event.target).parents('li.second-nav').offset().top || 100;
      $(_event.target).parents('li.second-nav').find('ul.third-ul').css("top", _offsetTop + "px").slideDown(300);
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
    "firstNavIcon": "icon-homepage",
    "firstNavOpen": false,
    "firstNavCallback": () => {
      this.navigate("homepage");
    }
  },{
    "firstNavName": "产品与服务",
    "firstNavIcon": "icon-arrow-right",
    "firstNavOpen": false,
    "firstNavCallback": this.toggleSecondNav,
    "secondNavs": [{
      "secondNavName": "TDH服务",
      "secondNavIcon": "icon-tdh-service",
      "secondNavOpen": false,
      "secondNavMouseCallback": () => {},
      "secondNavClickCallback": () => {}
    },{
      "secondNavName": "Transwarp Studio",
      "secondNavIcon": "icon-transwarp-studio",
      "secondNavOpen": false,
      "secondNavBlock": false,//if open is blocked
      "secondNavMouseCallback": this.toggleThirdNav,
      "secondNavClickCallback": () => {},
      "thirdNavs": [{
        "thirdNavName": "报表",
        "thirdNavIcon": "icon-report",
        "thirdNavCallback": () => {}
      },{
        "thirdNavName": "Notebook",
        "thirdNavIcon": "icon-notebook",
        "thirdNavCallback": () => {}
      },{
        "thirdNavName": "分析",
        "thirdNavIcon": "icon-analyze",
        "thirdNavCallback": () => {}
      },{
        "thirdNavName": "工作流",
        "thirdNavIcon": "icon-workflow",
        "thirdNavCallback": () => {}
      },{
        "thirdNavName": "OLAP",
        "thirdNavIcon": "icon-olap",
        "thirdNavCallback": () => {}
      },{
        "thirdNavName": "元数据",
        "thirdNavIcon": "icon-metadata",
        "thirdNavCallback": () => {}
      },{
        "thirdNavName": "TDT",
        "thirdNavIcon": "icon-tdt",
        "thirdNavCallback": () => {}
      },{
        "thirdNavName": "BulkLoad",
        "thirdNavIcon": "icon-bulkload",
        "thirdNavCallback": () => {}
      },{
        "thirdNavName": "HDFS浏览",
        "thirdNavIcon": "icon-hdfs-browser",
        "thirdNavCallback": () => {}
      },{
        "thirdNavName": "Transpedia",
        "thirdNavIcon": "icon-transpedia",
        "thirdNavCallback": () => {}
      }]
    },{
      "secondNavName": "数据资产",
      "secondNavIcon": "icon-data-asset",
      "secondNavOpen": false,
      "secondNavMouseCallback": () => {},
      "secondNavClickCallback": () => {}
    },{
      "secondNavName": "项目资产",
      "secondNavIcon": "icon-project-asset",
      "secondNavOpen": false,
      "secondNavMouseCallback": () => {},
      "secondNavClickCallback": () => {}
    },{
      "secondNavName": "应用市场",
      "secondNavIcon": "icon-application-market",
      "secondNavOpen": false,
      "secondNavMouseCallback": () => {},
      "secondNavClickCallback": () => {}
    },{
      "secondNavName": "模型商店",
      "secondNavIcon": "icon-model-store",
      "secondNavOpen": false,
      "secondNavMouseCallback": () => {},
      "secondNavClickCallback": () => {}
    }]
  },{
    "firstNavName": "管理",
    "firstNavIcon": "icon-arrow-right",
    "firstNavOpen": false,
    "firstNavCallback": this.toggleSecondNav,
    "secondNavs": [{
      "secondNavName": "租户",
      "secondNavIcon": "icon-tenant",
      "secondNavOpen": false,
      "secondNavMouseCallback": () => {},
      "secondNavClickCallback": () => {}
    },{
      "secondNavName": "用户",
      "secondNavIcon": "icon-user",
      "secondNavOpen": false,
      "secondNavMouseCallback": () => {},
      "secondNavClickCallback": () => {}
    },{
      "secondNavName": "角色",
      "secondNavIcon": "icon-role",
      "secondNavOpen": false,
      "secondNavMouseCallback": () => {},
      "secondNavClickCallback": () => {}
    }]
  },{
    "firstNavName": "个人",
    "firstNavIcon": "icon-arrow-right",
    "firstNavOpen": false,
    "firstNavCallback": this.toggleSecondNav,
    "secondNavs": [{
      "secondNavName": "消息",
      "secondNavIcon": "icon-message",
      "secondNavOpen": false,
      "secondNavMouseCallback": () => {},
      "secondNavClickCallback": () => {}
    },{
      "secondNavName": "工单",
      "secondNavIcon": "icon-ticket",
      "secondNavOpen": false,
      "secondNavMouseCallback": () => {},
      "secondNavClickCallback": () => {
        this.navigate("ticket");
      }
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
