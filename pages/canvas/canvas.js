//index.js
const app = getApp()
var wxDraw = require("../../utils/wxdraw.min.js").wxDraw;
var Shape = require("../../utils/wxdraw.min.js").Shape;

let rpx
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    wxCanvas: null // 注意这里 需要创建一个对象来接受wxDraw对象
  },
  onLoad: function () {
    let screen_width, screen_height
    wx.getSystemInfo({
      success(res) {
        rpx = res.windowWidth / 375;
        screen_width = res.windowWidth;
        screen_height = res.windowHeight;
      },
    })
    var context = wx.createCanvasContext('canvas');
    this.wxCanvas = new wxDraw(context, 0, 0, screen_width, screen_height);
    // this.cylinder(200, -30, 150, 10, "#f48888", 300)
    let color = ["#f44336", "#e91e63", "#9c27b0", "#673AB7", "#3f51b5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722"]
    color.map((item, i) => {
      setTimeout(() => {
        this.cylinder(200, -30 - (color.length - i) * 2, 150, 10, item, 300 - i * 5)
      }, `${i}000`);
    })
  },
  //圆柱
  cylinder: function (x, y, width, height, color, fail) {
    let cylinder = []
    let cylinders = {
      ellipse1: {
        type: "ellipse",
        x: x,
        y: y + height,
        a: width,
        b: height * 2,
        fillStyle: color,
        opacity: 1,
        // needShadow: true,
        // shadow: {
        //   offsetX: 1,
        //   offsetY: 1,
        //   blur: 10,
        //   color: "#000000"
        // }
      },
      rect: {
        type: "rect",
        x: x,
        y: y + height / 2,
        w: width,
        h: height,
        fillStyle: color
      },
      ellipse2: {
        type: "ellipse",
        x: x,
        y: y,
        a: width,
        b: height * 2,
        fillStyle: color,
        opacity: 1,
      },
    }
    let keys = Object.keys(cylinders);
    for (var i = 0; i < keys.length; i++) {
      cylinder[i] = new Shape(cylinders[keys[i]].type, cylinders[keys[i]], 'fill', false);
      this.wxCanvas.add(cylinder[i]);
      cylinder[i].animate({
        "y": `+=${fail}`
      }, {
        duration: 1500
      }).start(1);
    }
  },

  //事件处理函数
  bindtouchstart: function (e) {
    this.wxCanvas.touchstartDetect(e);
  },
  bindtouchmove: function (e) {
    this.wxCanvas.touchmoveDetect(e);
  },
  bindtouchend: function () {
    this.wxCanvas.touchendDetect();
  },
  bindtap: function (e) {
    this.wxCanvas.tapDetect(e);
  },
  bindlongpress: function (e) {
    this.wxCanvas.longpressDetect(e);
  },
  onUnload: function () {
    this.wxCanvas.clear()
  }
})