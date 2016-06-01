window.onload = function () {

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
}

// 用于存储队列的数据
var Queue = [12,76,87,33,45,22,66,99,34,38,28,86,73,45,58,67];


/**
 * 排序事件
 */
function queueSort() {

  // 冒泡排序
  for (var i = 0; i < Queue.length; i++) {
    for (var j = i; j < Queue.length; j++) {
      if (Queue[j] > Queue[j+1]) {
        var temp = Queue[j];
        Queue[j] = Queue[j+1];
        Queue[j+1] = temp;
        renderQueue();
        return;
      }
    }
  }


}

/**
 * 初始化队列数字处理事件
 */
function initNumBlock() {

  var queueWarp = document.getElementById("queue-wrap");

  eventUtil.addHandler(queueWarp, "click", function(e){
    if(e.target.nodeName.toLowerCase() === 'p'){
      var index = e.target.getAttribute('data-index');
      Queue.splice(index,1);
      renderQueue();
    }
  });

}


/**
 * 验证输入值函数
 */
function verifyNum(num) {

  var reg = new RegExp("^[0-9]*$");

  // 判断是否是数字
  if(reg.test(num) && num) {
    // 是否在10-100之间
    if(num < 10 || num > 100){  
      alert("请输入10-100以内的数字！");
      return false;
    } 
  } else {
    alert("请输入10-100以内的数字！");
    return false;
  }
  
  return true;

}

/**
 * 验证队列是否已满
 */
function verifyQueue() {

  var maxQueue = 60;

  if (Queue.length > maxQueue - 1) {
    alert("队列数量最多为"+maxQueue);
    return false;
  }

  return true;
}

/**
 * 点击按钮事件的处理函数
 */
function buttonHandle(obj) {

  // 获取输入值
  var num = document.getElementById("number").value;
  
  switch(obj.target.id)
  {
    case "leftin":
      if(verifyNum(num) && verifyQueue()){
        Queue.unshift(num);
      }
      break;
    case "rightin":
      if(verifyNum(num) && verifyQueue()){
        Queue.push(num);
      }
      break;
    case "leftout":
      if (Queue.length > 0) {
        alert(Queue.shift());
      } else {
        alert("当前队列为空！");
      }
      break;
    case "rightout":
      if (Queue.length > 0) {
        alert(Queue.pop());
      } else {
        alert("当前队列为空！");
      }
      break;
  }
  renderQueue();
}

/**
 * 初始化按钮事件
 */
function initButton() {

  var box = document.getElementById("box");
  var sortBtn = document.getElementById("sort");

  eventUtil.addHandler(box, "click", function(event){
    if(event.target.className.toLowerCase() === 'operate') {
      buttonHandle(event);
    }
  });

  eventUtil.addHandler(sortBtn, "click", function(){

    var t = setInterval(queueSort,500);

  });

}

/**
 * 渲染队列
 */
function renderQueue() {

  var queueWrap = document.getElementById("queue-wrap");
  var queueHtml = "";

  for (var i = 0; i < Queue.length; i++) {
    queueHtml += "<div class='block' style='width:20px'>";
    queueHtml += "<p data-index='"+ i +"' style='height:"+ Queue[i] +"px'>"+Queue[i]+"</p>";
    queueHtml += "</div>";
  }

  queueWrap.innerHTML = queueHtml;

}

/**
 * 初始化函数
 */
function init() {
  renderQueue();
  initButton();
  initNumBlock();
}

init();

}