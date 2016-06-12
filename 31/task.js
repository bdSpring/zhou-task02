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

// 城市-大学源数据
var citySourceData = {
  "北京": ["清华大学", "北京大学", "北京师范大学", "中国人民大学", "北京交通大学"],
  "上海": ["上海大学", "上海财经大学", "复旦大学", "同济大学", "华东师范大学"],
  "广东": ["中山大学", "暨南大学", "深圳大学", "华南理工大学", "广州大学"],
  "浙江": ["浙江大学", "浙江工业大学", "杭州电子科技大学", "浙江工商大学", "浙江财经大学"],
  "重庆": ["西南大学", "重庆大学", "西南政法大学", "重庆工商大学", "重庆医科大学"]
};

/**
 * 初始化下拉菜单
 */
function initSelectList() {
  var citySelect = document.getElementById("city");
  var usySelect = document.getElementById("university");
  var cityList = '';
  var usyList = '';
  for (var city in citySourceData) {
    cityList += "<option value = '" + city + "'>" + city + "</option>";
    if (city == "北京") {
      citySourceData[city].forEach(function (item, index) {
        usyList += "<option value = '" + item + "'>" + item + "</option>";
      });
    }
  }
  citySelect.innerHTML = cityList;
  usySelect.innerHTML = usyList;

  var citySourceArr = Object.getOwnPropertyNames(citySourceData);

  eventUtil.addHandler(citySelect, "click", function(e) {
    usyList = '';
    citySourceData[e.target.value].forEach(function(item, index) {
      usyList += "<option value = '" + item + "'>" + item + "</option>"; 
    })
    usySelect.innerHTML = usyList;
  });
}

/**
 * 初始化按钮选项
 */
function initRadio() {
  var status = document.getElementById("status");
  eventUtil.addHandler(status, "click", function(e) {
    if (e.target.id == "student") {
      document.getElementById("school").style.display = "block";
      document.getElementById("company").style.display = "none";
    }
    if (e.target.id == "work") {
      document.getElementById("company").style.display = "block";
      document.getElementById("school").style.display = "none";
    }
  }, false);
}



window.onload = function() {
  initSelectList();
  initRadio();
}