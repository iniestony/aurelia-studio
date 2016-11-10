import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {$utils} from "../../services/utils";

@inject(Router, $utils)
export class Ticket {

  query = {
    "ticketNo": "",
    "startDate": "",
    "endDate": "",
    "keyword": ""
  };

  showAssigneeFilter = false;

  selectedAssignee = {
    "name": "指派给任何人的工单",
    "value": ""
  };

  allAssignees = [{
    "name": "指派给任何人的工单",
    "value": ""
  },{
    "name": "指派给我的工单",
    "value": "iniestony"
  }];


  tickets = [{
    "id": "CA-123",
    "title": "工单名称工单名称工单名称",
    "p": 2,
    "queue": "平台资源申请",
    "category": "InceptorQuery",
    "status": "RESOLVED",
    "createDate": "2016.07.10",
    "endDate": "2016.07.10",
    "creator": "iniestony",
    "assignee": "iniestony",
    "selected": false
  },{
    "id": "CA-123",
    "title": "工单名称工单名称工单名称",
    "p": 2,
    "queue": "平台资源申请",
    "category": "InceptorQuery",
    "status": "DUPLICATED",
    "createDate": "2016.07.10",
    "endDate": "2016.07.10",
    "creator": "iniestony",
    "assignee": "",
    "selected": false
  },{
    "id": "CA-123",
    "title": "工单名称工单名称工单名称",
    "p": 2,
    "queue": "平台资源申请",
    "category": "InceptorQuery",
    "status": "CLOSED",
    "createDate": "2016.07.10",
    "endDate": "2016.07.10",
    "creator": "iniestony",
    "assignee": "iniestony",
    "selected": false
  },{
    "id": "CA-123",
    "title": "工单名称",
    "p": 2,
    "queue": "平台资源申请",
    "category": "InceptorQuery",
    "status": "OPEN",
    "createDate": "2016.07.10",
    "endDate": "2016.07.10",
    "creator": "iniestony",
    "assignee": "iniestony",
    "selected": false
  },{
    "id": "CA-123",
    "title": "工单名称",
    "p": 2,
    "queue": "平台资源申请",
    "category": "InceptorQuery",
    "status": "RESOLVED",
    "createDate": "2016.07.10",
    "endDate": "2016.07.10",
    "creator": "iniestony",
    "assignee": "",
    "selected": false
  },{
    "id": "CA-123",
    "title": "工单名称",
    "p": 2,
    "queue": "平台资源申请",
    "category": "InceptorQuery",
    "status": "REOPENED",
    "createDate": "2016.07.10",
    "endDate": "2016.07.10",
    "creator": "iniestony",
    "assignee": "iniestony",
    "selected": false
  }];
  
  constructor(r, u) {
    this.router = r;
    this.$utils = u;
  }
  
  attached() {
    
  }

  cleanQuery(_targetKey, keys) {
    if(this.$utils.trim(this.query[_targetKey]) === "") return;
    keys.forEach((key) => {
      this.query[key] = "";
    });
  }

  toggleAssignee() {
    this.showAssigneeFilter = !this.showAssigneeFilter;
  }

  closeAssignee() {
    this.showAssigneeFilter = false;
  }

  selectAssignee(_assignee) {
    this.selectedAssignee = _assignee;
  }

  createTicket() {
    
  }
  
  search() {
    
  }
}