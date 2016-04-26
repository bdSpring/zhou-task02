window.onload = function () {

  // 获取小方块
  var block = document.getElementById("block");

  // 小方块的初始长宽
  var blockWidth = 49;
  var blockheight = 49;

  // 小方块的初始方向
  var blockDirect = "top";

  // 小方块的初始位置坐标
  var blockX = 4;
  var blockY = 5;

  var angle = 0;

  var execBtn = document.getElementById("execute");

  /**
   * 识别命令函数
   */
  function  execCommand() {

    // 获取输入的指令
    var command = document.getElementById("command").value;

    switch(command.toUpperCase()) {
      case "GO":
        goAhead();
        break;
      case "TUN LEF":
        angle = angle - 90;
        break;
      case "TUN RIG":
        angle = angle + 90;
        break;
      case "TUN BAC":
        angle = angle - 180;
        break;
      default:
        errorTip();
    }
    turnAngle();
    //console.log(angle);
  }

  /**
   * 报错提示
   */
  function errorTip() {
    alert("输入的指令有误！");
  }

  /**
   * 转动函数
   */
  function turnAngle() {
    if (angle < 0) {
      angle += 360;
    } 
    if (angle > 360) {
      angle -= 360;
    }
    block.style.transform = "rotate("+ angle +"deg)";
  }

  /**
   * 移动方块函数
   */
  function moveBlock() {
    block.style.top = convertCoo(blockY) + "px";
    block.style.left = convertCoo(blockX) + "px";
  }

  /**
   * 判断方块方向函数
   */
  function judgeDirect() {
    switch(angle) {
      case 0:
        blockDirect = "top";
        break;
      case 90:
        blockDirect = "right";
        break;
      case 180:
        blockDirect = "bottom";
        break;
      case 270:
        blockDirect = "left";
        break;
    }
  }

  /**
   * 前进函数
   */
  function goAhead() {
    judgeDirect();
    //console.log(blockDirect);
    switch(blockDirect) {
      case "top":
        if (blockY > 1) {
          blockY -= 1;
        } 
        break;
      case "bottom":
        if (blockY < 10) {
          blockY += 1;
        } 
        break;
      case "left":
        if (blockX > 1) {
          blockX -= 1;
        }
        break;
      case "right":
        if (blockX < 10) {
          blockX += 1;
        }
        break;
    }
    moveBlock();
  }

  /**
   * 将坐标转为实际位置
   */
  function convertCoo(n) {
    return n * 50 + 1;
  }

  /**
   * 初始化函数
   */
  function init() {
    moveBlock();
    execBtn.onclick = execCommand;
  }

  init();
}