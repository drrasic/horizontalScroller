
/*
  HorizontalScroller - A quickly built plugin that scrolls lists horizontaly with left/right advancer buttons
  that works on right aligned lists - list can be aligned left/right with .hs-ListWrap{text-align:left/right}

  Classes
  ** .hs-Wrapper     On element that wraps everything
  ** .hs-ListWrap    On element that wraps your list
  ** .hs-List        On the List
  ** .hs-Item        On list item

  SETTINGS
  ** @listTravelDistance        distance to travel on advancer click (default:150px)
  ** @paddingWithoutAdvancers   set padding without advancers
  ** @paddingWithAdvancers      set padding with advancers

  Usefull Methods
  ** .goLeft()              scroll list left
  ** .goLeft()              scroll list right
  ** .showHideAdvancers()   call to recalculate advancers visibility

  Licensed under MIT
  Copyright 2017 Mihajlo Rasic
*/
var HorizontalScroller = function () {

  'use strict';

  function HorizontalScroller(wrapper, SETTINGS) {
    var this$1 = this;

    if (!wrapper) {
      return;
    }

    var DEFAULTS = {
      listTravelling: false,
      listTravelDirection: "",
      listTravelDistance: 150,
      paddingWithoutAdvancers: 30,
      paddingWithAdvancers: 10
    }

    this.SETTINGS = utils.extend(DEFAULTS, SETTINGS);

    this.wrapper = document.getElementById(wrapper);
    this.listWrap = this.wrapper.querySelector(".hs-ListWrap");
    this.List = this.wrapper.querySelector(".hs-List");

    this.hsAdvancerLeft = this.wrapper.querySelector(".hs-Advancer_Left");
    this.hsAdvancerRight = this.wrapper.querySelector(".hs-Advancer_Right");

    this.showHideAdvancers();

    this.listWrap.addEventListener("scroll", function() { utils.doSomething(this$1); });
    this.hsAdvancerLeft.addEventListener("click", function() { this$1.goLeft(); });
    this.hsAdvancerRight.addEventListener("click", function() { this$1.goRight(); });
    this.List.addEventListener("transitionend", function() { this$1.transit(); }, false);

  };

  var utils = {
    extend: function extend(a, b) {
      for (var key in b) {
        if (b.hasOwnProperty(key)) {
          a[key] = b[key];
        }
      }

      return a;
    },
    determineOverflow: function(content, container) {
      var containerMetrics = container.getBoundingClientRect();
      var containerMetricsRight = Math.floor(containerMetrics.right);
      var containerMetricsLeft = Math.floor(containerMetrics.left);
      var contentMetrics = content.getBoundingClientRect();
      var contentMetricsRight = Math.floor(contentMetrics.right);
      var contentMetricsLeft = Math.floor(contentMetrics.left);
      if (containerMetricsLeft > contentMetricsLeft && containerMetricsRight < contentMetricsRight) {
        return "both";
      } else if (contentMetricsLeft < containerMetricsLeft) {
        return "left";
      } else if (contentMetricsRight > containerMetricsRight) {
        return "right";
      } else {
        return "none";
      }
    },
    doSomething: function(scroller) {
      scroller.listWrap.setAttribute("data-overflowing", utils.determineOverflow(scroller.List, scroller.listWrap));
    }
  };

  HorizontalScroller.prototype.goLeft = function goLeft () {
    var this$1 = this;
    if (this$1.SETTINGS.listTravelling === true) {
      return;
    }
    if (utils.determineOverflow(this$1.List, this$1.listWrap) === "left" || utils.determineOverflow(this$1.List, this$1.listWrap) === "both") {
      var availableScrollLeft = this$1.listWrap.scrollLeft;
      if (availableScrollLeft < this$1.SETTINGS.listTravelDistance * 2) {
        this$1.List.style.transform = "translateX(" + availableScrollLeft + "px)";
      } else {
        this$1.List.style.transform = "translateX(" + this$1.SETTINGS.listTravelDistance + "px)";
      }
      this$1.List.classList.remove("hs-List-transition-off");
      this$1.SETTINGS.listTravelDirection = "left";
      this$1.SETTINGS.listTravelling = true;
    }
    this$1.listWrap.setAttribute("data-overflowing", utils.determineOverflow(this$1.List, this$1.listWrap));
  };

  HorizontalScroller.prototype.goRight = function goRight () {
    var this$1 = this;
    if (this$1.SETTINGS.listTravelling === true) {
      return;
    }
    if (utils.determineOverflow(this$1.List, this$1.listWrap) === "right" || utils.determineOverflow(this$1.List, this$1.listWrap) === "both") {
      var navBarRightEdge = this$1.List.getBoundingClientRect().right;
      var navBarScrollerRightEdge = this$1.listWrap.getBoundingClientRect().right;
      var availableScrollRight = Math.floor(navBarRightEdge - navBarScrollerRightEdge);
      if (availableScrollRight < this$1.SETTINGS.listTravelDistance * 2) {
        this$1.List.style.transform = "translateX(-" + availableScrollRight + "px)";
      } else {
        this$1.List.style.transform = "translateX(-" + this$1.SETTINGS.listTravelDistance + "px)";
      }
      this$1.List.classList.remove("hs-List-transition-off");
      this$1.SETTINGS.listTravelDirection = "right";
      this$1.SETTINGS.listTravelling = true;
    }
    this$1.listWrap.setAttribute("data-overflowing", utils.determineOverflow(this$1.List, this$1.listWrap));
  };

  HorizontalScroller.prototype.transit = function transit () {
    var this$1 = this;
    var styleOfTransform = window.getComputedStyle(this$1.List, null);
    var tr = styleOfTransform.getPropertyValue("-webkit-transform") || styleOfTransform.getPropertyValue("transform");
    var amount = Math.abs(parseInt(tr.split(",")[4]) || 0);
    this$1.List.style.transform = "none";
    this$1.List.classList.add("hs-List-transition-off");
    // Now lets set the scroll position
    if (this$1.SETTINGS.listTravelDirection === "left") {
      this$1.listWrap.scrollLeft = this$1.listWrap.scrollLeft - amount;
    } else {
      this$1.listWrap.scrollLeft = this$1.listWrap.scrollLeft + amount;
    }
    this$1.SETTINGS.listTravelling = false;
  };

  HorizontalScroller.prototype.showHideAdvancers = function showHideAdvancers () {
    var this$1 = this;
    if(utils.determineOverflow(this$1.List, this$1.listWrap) === 'none') {
      this.hsAdvancerLeft.style.display = "none";
      this.hsAdvancerRight.style.display = "none";
      this.wrapper.style.paddingLeft = this$1.SETTINGS.paddingWithAdvancers + 'px';
      this.wrapper.style.paddingRight = this$1.SETTINGS.paddingWithAdvancers + 'px';
    } else {
      this.hsAdvancerLeft.style.display = "block";
      this.hsAdvancerRight.style.display = "block";
      this.wrapper.style.paddingLeft = this$1.SETTINGS.paddingWithoutAdvancers + 'px';
      this.wrapper.style.paddingRight = this$1.SETTINGS.paddingWithoutAdvancers + 'px';
    }
  };

  return HorizontalScroller;
}();


