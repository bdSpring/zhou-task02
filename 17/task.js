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

/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/**
 * 用于生成随机颜色
 */
function randomColor() {
  // 记录颜色组
  var colorData = ["#000000", "#7F037D", "#058003", "#0500F3", "#FB0000"];

  var num = Math.floor(Math.random()*5);
  var color = colorData[num];

  return color;
}


/**
 * 显示提示文字
 */
function showText(i) {

  switch(pageState.nowGraTime)
  {
    case "day":
      var text = Object.getOwnPropertyNames(aqiSourceData[pageState.nowSelectCity]);
      return text[i];
    case "week":
      var text = "第" + (i+1) + "周";
      return text;
    case "month":
      var text = (i+1) + "月份";
      return text;
  }

}


/**
 * 渲染图表
 */
function renderChart() {

  var chartWrap = document.getElementById("aqi-chart-wrap");

  var data = chartData[pageState.nowSelectCity][pageState.nowGraTime];

  var width = 100/data.length;

  var str = '';

  for (var i = 0; i < data.length; i++) {
    str += "<div style ='width:"+ width +"%'><p style ='height:"+ data[i] +"px;background-color:"+ randomColor() +"' title='"+ showText(i) +"&#13;[AQI]："+ data[i] +"'></p></div>";
  }

  chartWrap.innerHTML = str;

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 


  // 设置对应数据
  var graTime = document.getElementsByName("gra-time");

  for (var i = 0; i < graTime.length; i++) {
    if (graTime[i].checked) {
      pageState.nowGraTime = graTime[i].value;
    }
  }

  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  var selectedCity = document.getElementById("city-select").value;
  // 确定是否选项发生了变化 
  

  // 设置对应数据
  pageState.nowSelectCity = selectedCity;

  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

  var formObj = document.getElementById("form-gra-time");

  eventUtil.addHandler(formObj, 'change', function(e){
    if(e.target.nodeName.toLowerCase() === 'input') {
      graTimeChange()
    }
  });
  

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var selectCity = document.getElementById("city-select");
  var strCity = '';

  for (var city in aqiSourceData) {
    strCity += "<option>"+ city +"</option>";
  }

  selectCity.innerHTML = strCity; 

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  eventUtil.addHandler(selectCity, 'change', citySelectChange);

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中


  //chartData
  //aqiSourceData

  for (var city in aqiSourceData) {
    chartData[city] = {};
    // 存储天数据
    var dayArray = [];
    // 存储周数据
    var weekArray = [];
    // 存储月数据
    var monthArray = [];

    // 遍历每天的apidata
    for (var val in aqiSourceData[city]) {
      dayArray.push(aqiSourceData[city][val]);
    }
    
    // 记录天数据
    chartData[city].day = dayArray;

    // 计算周数据
    var tempWeek = Object.getOwnPropertyNames(aqiSourceData[city]);


    // 1月1号为周五，先计算前三天为第一周的数据
    var firstWeek = Math.ceil((aqiSourceData[city][tempWeek[0]] + aqiSourceData[city][tempWeek[1]] + aqiSourceData[city][tempWeek[2]])/3);
    weekArray.push(firstWeek);

    for (var i = 3; i < tempWeek.length; i++) {

      var date = new Date(tempWeek[i]);
      nowWeek = date.getDay();

      if (nowWeek == 1) {
        var weeka = 0;
        for (var j = i; j < i + 7 && j < tempWeek.length; j++) {
          weeka += aqiSourceData[city][tempWeek[j]];
        }
        weekArray.push(Math.ceil(weeka/7));
      } 
    }

    chartData[city].week = weekArray;



    // 计算月数据
    for (var val in aqiSourceData[city]) {
      
      var date = new Date(val);
      monthData = date.getMonth();

      if (!(monthArray[monthData] instanceof Array)) {
        monthArray[monthData] = [];
      }

      // 每月总数据值
      monthArray[monthData][0] = monthArray[monthData][0] ? monthArray[monthData][0] + aqiSourceData[city][val] : aqiSourceData[city][val];
      // 每月天数
      monthArray[monthData][1] = monthArray[monthData][1] ? monthArray[monthData][1] + 1 : 1;
      // 每月平均值
      monthArray[monthData][2] = Math.ceil(monthArray[monthData][0]/monthArray[monthData][1]);

    }

    var marr = [];

    // 遍历月数据
    for (var i = 0; i < monthArray.length; i++) {
      marr[i] = monthArray[i][2];
    }

    chartData[city].month = marr;

  }

  console.log(chartData);

}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();

}
