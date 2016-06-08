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

//获取对象的css样式值
function getCss(o , prop){
  // Dom对象的style属性指向的对象只能获得嵌入式样式的值，比如<a style="..."></a>，这种写在元素内部的可以获得；
  // 但是通过外联样式表和内联样式表设置的样式值，只能通过以下方法获得，currentStyle对应的是Ie，另一个对应的是其他浏览器；
  return o.currentStyle ? o.currentStyle[prop] : document.defaultView.getComputedStyle(o, null)[prop];
}

/*说明：获取浏览器前缀*/
/*实现：判断某个元素的css样式中是否存在transition属性*/
/*参数：dom元素*/
/*返回值：Boolean，有则返回浏览器样式前缀，否则返回false*/
var prefix = (function(temp){
  var aPrefix = ["webkit","Moz","o","ms"],
    props = "";
  for(var i in aPrefix){
    props = aPrefix[i] + "Transition";
    if(temp.style[ props] != undefined){
      return aPrefix[i].toLowerCase();
    }
  }
  return false;
})(document.createElement("div"));
