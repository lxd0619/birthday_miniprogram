//index.js
const app = getApp()
var wxDraw = require("../../utils/wxdraw.min.js").wxDraw;
var Shape = require("../../utils/wxdraw.min.js").Shape;
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    wxCanvas: null // 注意这里 需要创建一个对象来接受wxDraw对象
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
  onLoad: function () {
    var context = wx.createCanvasContext('first');//还记得 在wxml里面canvas的id叫first吗
    this.wxCanvas = new wxDraw(context,0,0,400,500);
    var rect = new Shape('rect', {x: 60, y: 60, w: 40, h: 40, fillStyle: "#2FB8AC", rotate: Math.PI/2 },'mix', true);
    this.wxCanvas.add(rect);
    rect.animate({"x":"+=100","y":"+=100"},{duration:1000}).animate("rotate",Math.PI*5,{duration:1000}).start(3);
  },
  onUnload:function(){
    this.wxCanvas.clear()
  }
})