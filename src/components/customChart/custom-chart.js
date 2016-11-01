import {inject, bindable, bindingMode, containerless} from 'aurelia-framework';

@inject(Element)
export class CustomChart {


  constructor(elem) {
    this.element = elem;
  }

  attached() {
    console.log(this.element);
  }


}