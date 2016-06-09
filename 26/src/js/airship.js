// 飞船类
function AirShip(num) {
  // 飞船状态
  this.status = "stop";
  // 飞船编号
  this.airShipNum = num;
  // 飞船能源
  this.nowPower = 100;
}

// 创建飞船
AirShip.prototype.createAirShip = function() {

  var me = this;
  airShips[me.airShipNum].style.display = "block";

  eventUtil.addHandler(commandLines[me.airShipNum], "click", function(e) {

    switch(e.target.className.toLowerCase())
    {
      case "flybtn":
        me.powerSystem().startFly();
        me.energySystem().autoAddPower();
        break;
      case "sflybtn":
        me.powerSystem().stopFly();
        break;
      case "destroy":
        me.destroySystem();
        break;
    }

  });
};

// 飞船动力系统
AirShip.prototype.powerSystem = function (){

  var me = this;
  // 飞行速度
  this.speed = 20; 
  // 能源消耗
  this.usePower = 5;
  // 角度
  this.deg = 0;

  this.translate = getCss(airShips[me.airShipNum],[prefix+"Transform"]);

  // 开始飞行
  var startFly = function() {

    if (me.status == "stop") {
      me.status = "fly";
      showConsole((me.airShipNum + 1)  + "号开始飞行...");

      setTimeout(function() {

        if(me.deg % 20 == 0) {
          me.nowPower = me.nowPower - me.usePower;
        }

        me.deg += 1;
        
        airShips[me.airShipNum].style[prefix+"Transform"] = 'rotate(' + me.deg + 'deg) ' + me.translate + '';

        airShips[me.airShipNum].getElementsByTagName("span")[0].innerHTML = me.nowPower;

        if (me.status == 'fly' && me.nowPower > 0) {
          setTimeout(arguments.callee, 50);
        }
      }, 50); 
    }else {
      showConsole((me.airShipNum + 1)  + "号已经在飞行...");
    }
    
    
  };

  // 停止飞行
  var stopFly = function() {
    airShips[me.airShipNum].style[prefix+"Transform"] = 'rotate(' + me.deg + 'deg) ' + me.translate + '';
    me.status = "stop";

    showConsole((me.airShipNum + 1)  + "号停止飞行...");
  };

  return {
    startFly: startFly,
    stopFly: stopFly
  }

};

// 飞船能源系统
AirShip.prototype.energySystem = function (){

  var me = this;
  // 初始能源
  this.power = 100;
  // 提供能源
  this.addVal = 2;

  var autoAddPower = function () {

    setTimeout(function() {
      me.nowPower += 2;
      if (me.nowPower < 100) {
        setTimeout(arguments.callee, 1000);
      }
    }, 1000);  

  }

  return {
    autoAddPower: autoAddPower
  }

};

// 飞船信号接收系统
AirShip.prototype.signalSystem = {



};

// 飞船自爆系统
AirShip.prototype.destroySystem = function () {

  airShips[this.airShipNum].style.display = "none";
  commandLines[this.airShipNum].style.display = "none";
  showConsole((this.airShipNum + 1)  + "号爆炸！！！");
  AirShipNum--;

};



