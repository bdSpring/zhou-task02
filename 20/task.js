/**
 *  队列类
 */

function Queue() {
  // 用于存储队列元素
  this.queue = [];
  // 渲染队列区域
  this.queueWrap = document.getElementById("queue-wrap");
  // 操作区域
  this.box = document.getElementById("box");
  // 查询按钮
  this.queryBtn = document.getElementById("querybtn");
}

Queue.prototype = {

  // 对象初始化
  init: function() {
    this.initOpButton();
    this.initNumBlock();
  },

  initOpButton: function() {
    var me = this;

    eventUtil.addHandler(me.box, "click", function(event){
      if(event.target.className.toLowerCase() === 'opreate') {
        me.opButtonHandle(event);
      }
    });

    eventUtil.addHandler(me.queryBtn, "click", me.renderQueue);
  },

  // 队列操作方法
  opButtonHandle: function(obj) {
    var me = this;
    // 获取输入值
    var content = document.getElementById("content").value.trim();
    var strArr = "";
    switch(obj.target.id)
    {
      case "leftin":
        if (content) {
          strArr = content.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).forEach(function(item,index){
            me.queue.unshift(item);
            console.log(me.queue);
          });
        } else {
          alert("请输入内容");
        }
        break;
      case "rightin": 
        if (content) {
          strArr = content.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).forEach(function(item,index){
            me.queue.push(item);
          });
        } else {
          alert("请输入内容");
        }
        break;
      case "leftout":
        if (me.queue.length > 0) {
          alert(me.queue.shift());
        } else {
          alert("当前队列为空！");
        }
        break;
      case "rightout":
        if (me.queue.length > 0) {
          alert(me.queue.pop());
        } else {
          alert("当前队列为空！");
        }
        break;
    }
    this.renderQueue();
  },

  // 初始化队列块方法
  initNumBlock: function() {
    var me = this;
    eventUtil.addHandler(me.queueWrap, "click", function(e){
      if(e.target.className.toLowerCase() === 'block'){
        var index = e.target.getAttribute('data-index');
        me.queue.splice(index,1);
        me.renderQueue();
      }
    });

  },

  // 渲染列表
  renderQueue: function() {

    var queueHtml = "";
    var keyword = document.getElementById("keyword").value.trim();

    for (var i = 0; i < queue.queue.length; i++) {
      queueHtml += "<div class='block' data-index='"+ i +"'>"+ queue.queue[i].replace(new RegExp(keyword, "g"),"<span style='color:blue'>" + keyword + "</span>") +"</div>";
    }

    queue.queueWrap.innerHTML = queueHtml;
  }

};


