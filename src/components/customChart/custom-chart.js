import {inject, bindable, bindingMode, containerless} from 'aurelia-framework';
import 'echarts';
import * as themes from './themes/themes';
import {$utils} from "../../services/utils";

@inject(Element, themes, $utils)
export class CustomChart {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) chartConfig = {};
  @bindable({ defaultBindingMode: bindingMode.twoWay }) chartData;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) chartType = "line";

  chart = null;
  chartEvent = {};
  
  constructor(elem, themes, util) {
    this.element = elem;
    this.themes = themes;
    this.$utils = util;
  }

  attached() {
    this.chartWrapper = $(this.element).find("div")[0];
    this.chartParent = $(this.element).parent()[0];
    this.redraw();
  }

  redraw() {

  }

}