// 飞船类
function AirShip() {
  // 飞船状态
  this.status = 1;
  
}

AirShip.prototype.createAirShip = function() {

  airShips[AirShipNum].style.display = "block";

  eventUtil.addHandler(commandLines[AirShipNum], "click", function(e) {

    swicth(e.target.className.toLowerCase())
    {
      case:"flybtn"
        alert("开始飞行");
        break;
      case:"sflybtn"
        alert("停止飞行");
        break;
      case:"destroy"
        alert("销毁");
        break;
    }


  });

  this.powerSystem.init();
  this.energySystem.init();

};

// 飞船动力系统
AirShip.prototype.powerSystem = {

  init: function() {
    // 飞行速度
    this.speed = 20;
    // 能源消耗
    this.usePower = 5;

  },

  initStartFly: function () {

    var me = this;

    eventUtil.addHandler(createBtn, "click", function(e) {

     
    });

  },

  // 飞行
  startFly: function() {
    
  },

  // 停止飞行
  stopFly: function() {

  }

};

// 飞船能源系统
AirShip.prototype.energySystem = {

  init: function() {
    // 初始能源
    this.power = 100;
    // 提供能源
    this.addPower = 2;
  }

};

// 飞船信号接收系统
AirShip.prototype.signalSystem = {



};

// 飞船自爆系统
AirShip.prototype.boomSystem = {
};




// 最大飞船数
var AirShipMaxNum = 4;
// 记录当前飞船数量
var AirShipNum = 0;
// 飞船起飞按钮
var createBtn = document.getElementById('newship');
// 命令窗
var commandBox = document.getElementById('command-box');
// 命令行
var commandLines = commandBox.getElementsByTagName('div');
// 飞船
var airShips = document.querySelectorAll(".airship");
// 存储飞船数组
var airShipsArr = [];
// 初始化创建飞船按钮
eventUtil.addHandler(createBtn, "click", function(e) {

  if (AirShipNum < AirShipMaxNum) {
    // 显示命令行
    commandLines[AirShipNum].style.display = "block";
    // 新建飞船
    airShipsArr[AirShipNum] = new AirShip();
    airShipsArr[AirShipNum].createAirShip();
    AirShipNum += 1;
    showConsole(AirShipNum + "号飞船起飞...");
  } else {
    alert("最多只能起飞"+ AirShipMaxNum +"架飞船！请先销毁一架飞船！");
  }

});
// 跨浏览器事件处理程序
var eventUtil = {
  // 添加句柄
  addHandler : function (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    }
    else if (element.attachEvent) {
      element.attachEvent('on' + type, handler);
    }
    else {
      element['on' + type] = handler;
    }
  },
  // 删除句柄
  removeHandler : function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    }
    else if (element.detachEvent) {
      element.detachEvent('on' + type, handler);
    }
    else {
      element['on' + type] = null;
    }
  }
};

/*
 * 控制台实现
 */
function showConsole(info) {
  
  var msgBox = document.querySelector('#console .msgbox');
  var msg = document.createElement("div");
  msg.className = "msg";
  msg.innerHTML = "<span>[" + getDateStr() + "]: " + info + "</span>";
  msgBox.appendChild(msg);

}

function getDateStr() {

  var nowTime = new Date();
  var y = nowTime.getFullYear();
  var m = nowTime.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = nowTime.getDate();
  d = d < 10 ? '0' + d : d;

  var h = nowTime.getHours();
  h = h < 10 ? '0' + h : h;
  var f = nowTime.getMinutes();
  f = f < 10 ? '0' + f : f;
  
  return y + '-' + m + '-' + d + ' ' + h + ':' + f;
}