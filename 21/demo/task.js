/**
 *  队列类
 */
function Queue(arr, wrap, element) {
  // 用于存储队列元素
  this.queue = arr;
  // 渲染队列区域
  this.queueWrap = document.getElementById(wrap);

  this.tagIpt = document.getElementById(element);
  // 标识符
  this.flag = 1;

}

Queue.prototype = {

  // 初始化事件
  init: function() {
    this.initTagBlock();
    this.renderQueue();
  },

  // 初始化tag输入框事件
  initTagIpt: function() {

    var me = this;
    var re = /[,，\s\n]+/;

    eventUtil.addHandler(me.tagIpt, "keyup", function(e) {

      if (re.test(me.tagIpt.value) || e.keyCode === 13) {
        var str = me.tagIpt.value.slice(0,length-1).trim();
        me.isReTag(str);
        if (me.flag && (str !== "")) {
          if (me.queue.length == 10) {
            me.queue.shift();
          }
          me.queue.push(str);
          me.renderQueue();
        }
        me.tagIpt.value = "";
      }
      
    });
  },
  
  // 初始化确认爱好按钮事件
  initHobbyBtn: function() {
    var me = this;
    var hbtn = document.getElementById("hbtn");

    eventUtil.addHandler(hbtn, "click", function(e) {

      var hobbyctn = document.getElementById("hobbyctn").value.trim();

      // 输入是否为空
      if (hobbyctn) {

        // 处理输入的字符串
        hobbyctn.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).forEach(function(item,index){
          me.queue.push(item);
        });

        // 数组去重
        var tempArr = [];
        for (var i = 0; i < me.queue.length; i++) {
          if (tempArr.indexOf(me.queue[i]) == -1) {
            tempArr.push(me.queue[i]);
          }
        }
        me.queue = tempArr;
        // 判断是否大于10
        if (me.isMax(me.queue.length)) {
          me.renderQueue();
        }
        
      } else {
        alert("请输入兴趣爱好");
      }
      
      
    });
    
  },

  isMax: function(len) {

    if (len > 10) {
      this.queue.shift();
      arguments.callee(this.queue.length);
    }
    return true;
  },

  // 判断tag是否重复
  isReTag: function(str) {
    var me = this;
    me.flag = 1;
    this.queue.forEach(function(item,index) {
      if (str == item) {
        me.flag = 0;
      }
    });
  },

  // 初始化tag标签事件
  initTagBlock: function() {
    var me = this;
    eventUtil.addHandler(me.queueWrap, "mouseover", function(e) {
      if (e.target.className.toLowerCase() === "block") {
        e.target.childNodes[0].style.display = "inline-block";
        e.target.style.backgroundColor = "red";
      }
    });

    eventUtil.addHandler(me.queueWrap, "click", function(e) {
      if (e.target.tagName.toLowerCase() === "span") {
        var index = e.target.parentNode.getAttribute('data-index');
        me.queue.splice(index,1);
        me.renderQueue();
      }
    });

  },

  // 初始化tag鼠标悬停事件
  initTagMouse: function() {
    for (var i = 0; i < this.queueWrap.childNodes.length; i++) {
      this.queueWrap.childNodes[i].onmouseleave = function() {
        this.childNodes[0].style.display = "none";
        this.style.backgroundColor = "#8BC9FF";
      };
    }
  },

  // 渲染列表
  renderQueue: function() {

    var queueHtml = "";

    for (var i = 0; i < this.queue.length; i++) {
      queueHtml += "<div class='block' data-index='"+ i +"'><span>点击删除</span>"+ this.queue[i] +"</div>";
    }

    this.queueWrap.innerHTML = queueHtml;
    this.initTagMouse();
  }

};


