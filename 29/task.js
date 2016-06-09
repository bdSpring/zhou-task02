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
  };
  /*
   * 字符串首尾去空
   */
  function trimStr(str){
    return str.replace(/(^\s*)|(\s*$)/g,"");
  }


  /*
   * 初始化验证按钮
   */
  function initVerifyBtn() {

    var vBtn = document.getElementById("verify");

    eventUtil.addHandler(vBtn, 'click', function(e) {

      var iptVal = trimStr(document.getElementById("ipt1").value);

      showTip(verify(iptVal));

    });
  }

  /*
   * 验证规则
   */
  function verify(value) {
    var vLen = getLen(value);
    if (value == "") {
      return 1;
    } else if (vLen < 4 || vLen > 16) {
      return 2;
    } else {
      return 3;
    }
  }

  /*
   * 计算内容长度
   */
  function getLen(str) {
    return str.replace(/[^\u0000-\u00FF]/g,"aa").length;
  }
  
  /*
   * 提示文字
   */
  function showTip(res) {
    var tip = document.getElementById('tip');
    var ipt = document.getElementById('ipt1');
    switch (res)
    {
      case 1:
        tip.className = "text-warning";
        tip.innerHTML = "姓名不能为空";
        ipt.className = "info";
        break;
      case 2:
        tip.className = "text-warning";
        tip.innerHTML = "长度为4~16个字符";
        ipt.className = "warning";
        break;
      case 3:
        tip.className = "text-success";
        tip.innerHTML = "名称格式正确";
        ipt.className = "success";
        break;
    }

  }

  initVerifyBtn();

}