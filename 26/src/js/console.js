/*
 * 控制台实现
 */
function showConsole(info) {
  
  var msgBox = document.querySelector('#console .msgbox');
  var msg = document.createElement("div");
  msg.className = "msg";
  msg.innerHTML = "<span>[" + getDateStr() + "]: " + info + "</span>";
  msgBox.appendChild(msg);

}

function getDateStr() {

  var nowTime = new Date();
  var y = nowTime.getFullYear();
  var m = nowTime.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = nowTime.getDate();
  d = d < 10 ? '0' + d : d;

  var h = nowTime.getHours();
  h = h < 10 ? '0' + h : h;
  var f = nowTime.getMinutes();
  f = f < 10 ? '0' + f : f;
  var s = nowTime.getSeconds();
  s = s < 10 ? '0' + s : s;
  
  return y + '-' + m + '-' + d + ' ' + h + ':' + f + ':' + s;
}