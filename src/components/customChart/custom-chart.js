import {inject, bindable, bindingMode, containerless} from 'aurelia-framework';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/title';
import 'echarts/lib/component/axis';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/timeline';
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
    // if(!this.chartData || !this.chartConfig){
    //   return;
    // }

    this.setSizes(this.chartConfig);

    if(!this.chart) {
      this.chart = echarts.init(this.chartWrapper, this.themes[this.chartConfig.theme || "dark"]);
      console.log(this.chart);
    }

    if(this.chartConfig.event){
      if(!Array.isArray(this.chartConfig.event)){
        this.chartConfig.event = [this.chartConfig.event];
      }
      if(Array.isArray(this.chartConfig.event)){
        this.chartConfig.event.forEach(function(e){
          if(!this.chartEvent[e.type]) {
            this.chartEvent[e.type] = true;
            this.chart.on(e.type, function (param) {
              e.fn(param);
            });
          }
        });
      }
    }

    let options = this.getOptions(this.chartData, this.chartConfig, this.chartType);
    if (this.chartConfig.forceClear) {
      this.chart.clear();
    }
    if (options.series.length) {
      this.chart.setOption(options);
      this.chart.resize();
    }
  }

  setSizes(config) {
    let width = config.width || this.chartParent.clientWidth || 320;
    let height = config.height || this.chartParent.clientHeight || 240;
    this.chartWrapper.style.width = width + "px";
    this.chartWrapper.style.height = height + "px";
  }

  getOptions() {
    return {
      backgroundColor: '#2c343c',

      title: {
        text: 'Customized Pie',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc'
        }
      },

      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },

      series : [
        {
          name:'访问来源',
          type:'pie',
          radius : '55%',
          center: ['50%', '50%'],
          data:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:274, name:'联盟广告'},
            {value:235, name:'视频广告'},
            {value:400, name:'搜索引擎'}
          ].sort(function (a, b) { return a.value - b.value}),
          roseType: 'angle',
          label: {
            normal: {
              textStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            }
          },
          itemStyle: {
            normal: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }
}