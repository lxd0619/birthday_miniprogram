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
    this.cylinder(200, 200, 100, 10, "#f48888")
  },
  //圆柱
  cylinder: function (x, y, width, height, color) {
    let cylinder = []
    let cylinders = {
      rect: {
        type: "rect",
        x: x,
        y: y + height / 2,
        w: width,
        h: height,
        fillStyle: color
      },
      ellipse1: {
        type: "ellipse",
        x: x,
        y: y + height,
        a: width,
        b: height * 2,
        fillStyle: color,
        opacity: 1,
        shadow: {
          blur: 2
        }
      },
      ellipse2: {
        type: "ellipse",
        x: x,
        y: y,
        a: width,
        b: height * 2,
        fillStyle: color,
        opacity: 1,
        shadow: {
          blur: 2
        }
      },
    }
    let keys = Object.keys(cylinders);
    for (var i = 0; i < keys.length; i++) {
      cylinder[i] = new Shape(cylinders[keys[i]].type, cylinders[keys[i]], 'fill', false);
      this.wxCanvas.add(cylinder[i]);
      console.log(cylinder[i])
      cylinder[i].animate({
        "y": "+=100"
      }, {
        duration: 1000
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