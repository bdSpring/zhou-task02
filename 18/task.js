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
var Queue = [];


/**
 * 初始化队列数字
 */
function initNumBlock() {

  var queueWarp = document.getElementById("queue-wrap");

  eventUtil.addHandler(queueWarp, "click", function(e){

    if(e.target.className.toLowerCase() === 'block'){
      var index = e.target.getAttribute('data-index');
      Queue.splice(index,1);
      renderQueue();
    }
 
  });
}


/**
 * 点击按钮事件的处理函数
 */
function buttonHandle(obj) {

  // 获取输入值
  var num = document.getElementById("number").value;

  var reg = new RegExp("^[0-9]*$"); 
  
  switch(obj.target.id)
  {
    case "leftin":
      if(reg.test(num) && num){  
        Queue.unshift(num);
      }else{
        alert("请输入数字！");
      }
      break;
    case "rightin":
      if(reg.test(num) && num){  
        Queue.push(num);
      }else{
        alert("请输入数字！");
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

  eventUtil.addHandler(box, "click", function(event){

    if(event.target.nodeName.toLowerCase() === 'button') {
      buttonHandle(event);
    }

  });

}

/**
 * 渲染队列
 */
function renderQueue() {

  var queueWrap = document.getElementById("queue-wrap");
  var queueHtml = "";

  for (var i = 0; i < Queue.length; i++) {
    queueHtml += "<div class='block' data-index='"+ i +"'>"+Queue[i]+"</div>";
  }

  queueWrap.innerHTML = queueHtml;

}

/**
 * 初始化函数
 */
function init() {
  initButton();
  initNumBlock();
}

init();

}