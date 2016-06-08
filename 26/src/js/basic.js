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
    airShipsArr[AirShipNum] = new AirShip(AirShipNum);
    airShipsArr[AirShipNum].createAirShip();
    AirShipNum += 1;
    showConsole(AirShipNum + "号飞船正在待命...");
  } else {
    alert("最多只能起飞"+ AirShipMaxNum +"架飞船！请先销毁一架飞船！");
  }

});


