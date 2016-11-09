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

  createTicket() {
    
  }
  
  search() {
    
  }
}