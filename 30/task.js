// 跨浏览器事件处理程序
var eventUtil = {
  // 添加句柄
  addHandler : function (element, type, handler, boolean) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, boolean);
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
      element.removeEventListener(type, handler, boolean);
    }
    else if (element.detachEvent) {
      element.detachEvent('on' + type, handler);
    }
    else {
      element['on' + type] = null;
    }
  }
};

// 验证成功标识符
var f1,f2,f3,f4,f5;

/*
 * 字符串首尾去空
 */
function trimStr(str){
  return str.replace(/(^\s*)|(\s*$)/g,"");
}

/*
 * 初始化表单事件
 */
function initForm() {

  var form = document.getElementById("form");
  var subBtn = document.getElementById("sbtn");

  // 绑定输入框聚焦事件
  eventUtil.addHandler(form, "focus", function(e){
    if (e.target.nodeName.toLowerCase() === 'input') {
      var ipt = document.getElementById(e.target.id);
      ipt.style.border = "2px solid #62ADEE";
      showRuleTip(e.target.id);
    }
  }, true);

  // 绑定输入框失焦事件
  eventUtil.addHandler(form, "blur", function(e){
    if (e.target.nodeName.toLowerCase() === 'input') {
      var iptName = e.target.id;
      showResTip(e.target.id);
    }
  }, true);

  // 绑定提交按钮事件
  eventUtil.addHandler(subBtn, "click", function(e){
    
    var allIpt = document.getElementById("form").getElementsByTagName("input");
    var arrayOfallIpt = Array.prototype.slice.call(allIpt,0);
    arrayOfallIpt.forEach(function(item, index) {
      showResTip(item.id);
    });

    if (f1 && f2 && f3 && f4 && f5) {
      alert("提交成功！");
    } else {
      alert("提交失败！");
    }

  }, false);

}

/*
 * 名称验证
 */
function verifyName(value) {
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
 * 密码验证
 */
function verifyPwd(value) {
  var vLen = getLen(value);
  if (value == "") {
    return 1;
  } else if (vLen < 6 || vLen > 16) {
    return 2;
  } else {
    return 3;
  }
}

/*
 * 密码确认验证
 */
function verifyPwd2(value) {
  var pwd =trimStr(document.getElementById("pwd").value);
  if (pwd == '') {
    return 3
  } else {
    return pwd == value ? 2 : 1;
  }
}

/*
 * 邮箱验证
 */
function verifyMail(value) {
  var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return reg.test(value);
}

/*
 * 手机验证
 */
function verifyMobile(value) {
  var reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
  return reg.test(value);
}

/*
 * 计算内容长度
 */
function getLen(str) {
  return str.replace(/[^\u0000-\u00FF]/g,"aa").length;
}

/*
 * 得到提示文字所在节点
 */
function getTipNode(id) {
  var tip = document.getElementById(id).parentNode.childNodes;
  var arrayOfNodes = Array.prototype.slice.call(tip,0);
  var showTip;
  arrayOfNodes.forEach(function(item, index){
    if(item.nodeName.toLowerCase() === "p") {
      showTip = item;
    } 
  });
  return showTip;
}


/*
 * 获得焦点提示文字
 */
function showRuleTip(id) {
  var showTip = getTipNode(id);
  showTip.style.display = "block";
  showTip.className = "text-default";
  switch (id)
  {
    case "name":
      showTip.innerHTML = "必填，长度为4~16个字符";
      break;
    case "pwd":
      showTip.innerHTML = "必填，长度为6~16个字符";
      break;
    case "cpwd":
      showTip.innerHTML = "再次输入相同密码";
      break;
    case "mail":
      showTip.innerHTML = "必填，请输入正确的邮箱地址";
      break;
    case "mobile":
      showTip.innerHTML = "必填，请输入11位手机号码";
      break;
  }

}

/*
 * 失去焦点提示文字
 */
function showResTip(id) {
  var showTip = getTipNode(id);
  var ipt = document.getElementById(id);
  var iptVal = trimStr(ipt.value);
  var command;
  showTip.style.display = "block";
  switch (id)
  {
    case "name":
      command = verifyName(iptVal);
      if(command == 1) {
        showTip.innerHTML = "名称不能为空";
        showTip.className = "text-warning";
        ipt.style.border = "2px solid #DD010D";
      } else if (command == 2){
        showTip.innerHTML = "名称长度必须为4-16个字符";
        showTip.className = "text-warning";
        ipt.style.border = "2px solid #DD010D";
      } else {
        showTip.innerHTML = "名称可用";
        showTip.className = "text-success";
        ipt.style.border = "2px solid #5EBB48";
        f1 = true;
      }
      break;
    case "pwd":
      command = verifyPwd(iptVal);
      if(command == 1) {
        showTip.innerHTML = "密码不能为空";
        showTip.className = "text-warning";
        ipt.style.border = "2px solid #DD010D";
      } else if (command == 2){
        showTip.innerHTML = "密码长度必须为6-16个字符";
        showTip.className = "text-warning";
        ipt.style.border = "2px solid #DD010D";
      } else {
        showTip.innerHTML = "密码可用";
        showTip.className = "text-success";
        ipt.style.border = "2px solid #5EBB48";
        f2 = true;
      }
      break;
    case "cpwd":
      command = verifyPwd2(iptVal);
      if(command == 1) {
        showTip.innerHTML = "密码输入不一致";
        showTip.className = "text-warning";
        ipt.style.border = "2px solid #DD010D";
      } else if(command == 3) {
        showTip.innerHTML = "密码不能为空";
        showTip.className = "text-warning";
        ipt.style.border = "2px solid #DD010D";
      } else {
        showTip.innerHTML = "输入密码一致";
        showTip.className = "text-success";
        ipt.style.border = "2px solid #5EBB48";
        f3 = true;
      }
      break;
    case "mail":
      command = verifyMail(iptVal);
      if(!command) {
        showTip.innerHTML = "邮箱格式错误";
        showTip.className = "text-warning";
        ipt.style.border = "2px solid #DD010D";
      } else {
        showTip.innerHTML = "邮箱格式正确";
        showTip.className = "text-success";
        ipt.style.border = "2px solid #5EBB48";
        f4 = true;
      }
      break;
    case "mobile":
      command = verifyMobile(iptVal);
      if(!command) {
        showTip.innerHTML = "手机格式错误";
        showTip.className = "text-warning";
        ipt.style.border = "2px solid #DD010D";
      } else {
        showTip.innerHTML = "手机格式正确";
        showTip.className = "text-success";
        ipt.style.border = "2px solid #5EBB48";
        f5 = true;
      }
      break;
  }

}

window.onload = initForm;
