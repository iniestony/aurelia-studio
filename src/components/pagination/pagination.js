import {bindable, bindingMode, containerless} from 'aurelia-framework';

@containerless()
export class Pagination {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) pageIndex;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) totalPage;
  boundIndex = 2;

  pageIndexChanged(n, o) {
    this.setComputed();
  }

  totalPageChanged(n, o) {
    this.setComputed();
  }

  setComputed() {
    this.isFirstPage = this.pageIndex === 1;
    this.isLastPage = this.pageIndex === this.totalPage;
    /**
     * boundIndex lies in [pageIndex-3, pageIndex]
     * if still in this region, no update
     * else approach to the nearest bound with also lies into [2, totalPage-4]
     **/
    if(this.boundIndex > this.pageIndex){
      this.boundIndex = Math.max(Math.min(this.pageIndex, this.totalPage - 4), 2);
      return;
    }
    if(this.boundIndex + 3 < this.pageIndex){
      this.boundIndex = Math.max(Math.min(this.pageIndex - 3, this.totalPage - 4), 2);
    }

  }

  constructor() {
    this.toPrev = (() => {
      console.log("No valid toPrev function implemented in parent model-view");
    });
    this.toNext = (() => {
      console.log("No valid toNext function implemented in parent model-view");
    });
    this.toSpecify = ((index) => {
      console.log("No valid toSpecify function implemented in parent model-view");
    });
  }

  bind(bindingContext) {
    this.$parent = bindingContext;
    if(!!this.$parent.toPrev && (typeof this.$parent.toPrev === "function")){
      this.toPrev = (() => {
        if(this.isFirstPage) return;
        this.$parent.toPrev();
      });
    }
    if(!!this.$parent.toNext && (typeof this.$parent.toNext === "function")){
      this.toNext = (() => {
        if(this.isLastPage) return;
        this.$parent.toNext();
      });
    }
    if(!!this.$parent.toSpecify && (typeof this.$parent.toSpecify === "function")){
      this.toSpecify = ((index) => {
        this.$parent.toSpecify(index);
      });
    }
  }

  attached() {
    this.setComputed();
  }
}
