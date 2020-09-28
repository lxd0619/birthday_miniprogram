//index.js
var wxDraw = require("../../utils/wxdraw.min.js").wxDraw;
var Shape = require("../../utils/wxdraw.min.js").Shape;

let rpx
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    wxCanvas: null, // 注意这里 需要创建一个对象来接受wxDraw对象
    text: "",
    line: ""
  },
  onLoad: function () {
    this.start()
  },
  start: function () {
    let screen_width, screen_height
    wx.getSystemInfo({
      success(res) {
        rpx = res.windowWidth / 375;
        screen_width = res.windowWidth;
        screen_height = res.windowHeight;

      },
    })
    this.setData({
      screen_width,
      screen_height
    })
    var context = wx.createCanvasContext('canvas');
    this.wxCanvas = new wxDraw(context, 0, 0, screen_width, screen_height);
    this.line()
    setTimeout(() => {
      this.text("Happy birthday!.")
    }, 3000);
    this.cake()
    setInterval(() => {
      this.snow(Math.floor(Math.random() * 10 + 1))
    }, 800);
  },
  snow: function (random) {
    let color = ["#e91e63", "#9c27b0", "#673AB7", "#3f51b5", "#2196F3", "#009688", "#8BC34A", "#CDDC39", "#FF9800", "#FF5722"]
    let rect = new Shape("rect", {
      x: random,
      y: random,
      w: 0,
      h: 0,
      fillStyle: color[random - 1]
    }, 'fill', true)
    this.wxCanvas.add(rect)
    setInterval(() => {
      rect.animate({
        x: `+=${Math.floor(Math.random() * 10 + 1)*20}`,
        y: `+=${Math.floor(Math.random() * 10 + 1)*20}`,
        w: Math.floor(Math.random() * 10 + 2),
        h: Math.floor(Math.random() * 10 + 2),
        rotate: Math.PI / random
      }, {
        duration: 1000
      }).start(1)
    }, 1000);
  },
  //文字生成
  text: function (src) {
    let string, timer
    src.split("").map((item, i) => {
      timer = setTimeout(() => {
        string = this.data.text + item
        this.setData({
          text: string
        })
      }, `${i*2}00`);
    })
    clearTimeout(timer)
  },
  line: function () {
    setInterval(() => {
      if (this.data.line == "") {
        this.setData({
          line: "|"
        })
      } else {
        this.setData({
          line: ""
        })
      }
    }, 500);
  },
  //蛋糕
  cake: function () {
    let timer
    let color = ["#f44336", "#e91e63", "#9c27b0", "#673AB7", "#3f51b5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722"]
    color.map((item, i) => {
      timer = setTimeout(() => {
        this.cylinder(200, -30, 150, 5, item, 500 - 5 * i)
      }, `${i*600}`);
    })
    clearTimeout(timer)
    setTimeout(() => {
      this.candle()
    }, `${(color.length-1)*600}`)
    setTimeout(() => {
      this.flame()
    }, `${(color.length+1)*600}`)
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
        opacity: 1
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
        needShadow: true,
        shadow: {
          offsetX: 1,
          offsetY: 1,
          blur: 1,
          color: "#fff"
        }
      }
    }
    let keys = Object.keys(cylinders);
    for (var i = 0; i < keys.length; i++) {
      cylinder[i] = new Shape(cylinders[keys[i]].type, cylinders[keys[i]], 'fill', false);
      this.wxCanvas.add(cylinder[i]);
      cylinder[i].animate({
        "y": `+=${fail}`
      }, {
        duration: 1000,
        easing: "easeOutBounce"
      }).start(1);
    }
  },
  //蜡烛
  candle: function () {
    let candle = []
    let candles = {
      ellipse1: {
        type: "ellipse",
        x: 200,
        y: -27,
        a: 10,
        b: 15,
        fillStyle: "#f00",
        opacity: 1
      },
      rect: {
        type: "rect",
        x: 200,
        y: -40,
        w: 10,
        h: 20,
        fillStyle: "#f00"
      },
      ellipse2: {
        type: "ellipse",
        x: 200,
        y: -40,
        a: 10,
        b: 15,
        fillStyle: "#f00",
        opacity: 1
      }
    }
    let keys = Object.keys(candles);
    for (var i = 0; i < keys.length; i++) {
      candle[i] = new Shape(candles[keys[i]].type, candles[keys[i]], 'fill', false);
      this.wxCanvas.add(candle[i]);
      candle[i].animate({
        "y": "+=420"
      }, {
        duration: 1000,
        easing: "easeOutBounce"
      }).start(1);
    }
  },
  //火苗
  flame: function () {
    var rect1 = new Shape('rect', {
      x: 200,
      y: 360,
      w: 0,
      h: 0,
      lineWidth: 20,
      fillStyle: "#FFEC3D",
      rotate: Math.PI / 4,
      needShadow: true,
      shadow: {
        offsetX: 1,
        offsetY: 1,
        blur: 1,
        color: "#cccccc"
      }
    }, 'fill', true);
    var rect2 = new Shape('rect', {
      x: 200,
      y: 360,
      w: 0,
      h: 0,
      lineWidth: 20,
      fillStyle: "#FFEC3D",
      rotate: Math.PI / 4,
    }, 'fill', true);
    this.wxCanvas.add(rect1)
    this.wxCanvas.add(rect2)
    rect1.animate({
      x: "+=1",
      w: "+=10",
      h: "+=10",
      fillStyle: "#FFC53D"
    }, {
      duration: 500
    }).animate({
      x: "-=1",
      y: "-=20",
      w: "-=10",
      h: "-=10",
      fillStyle: "#ff0000"
    }, {
      duration: 500
    }).start(true);
    setTimeout(() => {
      rect2.animate({
        x: "-=1",
        w: "+=10",
        h: "+=10",
        fillStyle: "#FFC53D"
      }, {
        duration: 500
      }).animate({
        x: "+=1",
        y: "-=20",
        w: "-=10",
        h: "-=10",
        fillStyle: "#ff0000"
      }, {
        duration: 500
      }).start(true);
    }, 500);
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