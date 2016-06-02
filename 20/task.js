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
  var content = document.getElementById("content").value.trim();
  
  switch(obj.target.id)
  {
    case "leftin":
      if (content) {
        var strArr = content.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).forEach(function(item,index){
          Queue.unshift(item);
        });
      } else {
        alert("请输入内容");
      }
      break;
    case "rightin": 
      if (content) {
        var strArr = content.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).forEach(function(item,index){
          Queue.push(item);
        });
      } else {
        alert("请输入内容");
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
 * 初始化队列操作按钮事件
 */
function initOpButton() {

  var box = document.getElementById("box");
  var queryBtn = document.getElementById("querybtn");

  eventUtil.addHandler(box, "click", function(event){
    if(event.target.className.toLowerCase() === 'opreate') {
      buttonHandle(event);
    }
  });

  eventUtil.addHandler(queryBtn, "click", renderQueue);

}

/**
 * 渲染队列
 */
function renderQueue() {

  var queueWrap = document.getElementById("queue-wrap");
  var queueHtml = "";
  var keyword = document.getElementById("keyword").value.trim();

  for (var i = 0; i < Queue.length; i++) {
    queueHtml += "<div class='block' data-index='"+ i +"'>"+ Queue[i].replace(new RegExp(keyword, "g"),"<span style='color:blue'>" + keyword + "</span>") +"</div>";
  }

  queueWrap.innerHTML = queueHtml;
}

/**
 * 初始化函数
 */
function init() {
  initOpButton();
  initNumBlock();
}

init();

}
