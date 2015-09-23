var milkcocoa = new MilkCocoa("woodiesuswxb.mlkcca.com");
var ds = milkcocoa.dataStore("LIG");
var graphData = [],timeData = [];
var d = new Date();
document.write(d.toLocaleDateString());

graphData[0] = 0;
timeData[0] = 0;

for (var i = 1; i <= 24; i++) {
  graphData[i] = 0;
  timeData[i] = i+"時";
}

//更新時
// ds.on('push',function(data){
//   // timeData.push(milkcocoaDateParse(data.timestamp));
//   // graphData.push(data.value.v);
//   // if(graphData.length >= 20){
//   //   timeData.shift();
//   //   graphData.shift();
//   // }
//   // rendering();
// });

//初期取得
ds.stream().sort("desc").size(999).next(function(err, datas){
  for (var i = 0,len = datas.length; i < len; i++) {
    var h = milkcocoaDateParse(datas[i].timestamp);
    graphData[h] += datas[i].value.v;
    if(i === len - 1) rendering();
  }
});

//フォーマット
function milkcocoaDateParse(date){
  var d = new Date(date);
  // console.log(d.toLocaleTimeString());
  return d.getHours();
}

var lineChartData = {
  //x軸の情報
  labels : timeData,
  //各グラフの情報。複数渡すことができる。
  datasets : [
    {
      fillColor : "rgba(151, 187, 205, 0.5)",
      strokeColor : "rgba(151, 187, 205, 1)",
      pointColor : "rgba(151, 187, 205, 1)",
      pointStrokeColor : "#fff",
      data:graphData
    }
  ]
}

var option = {
  //縦軸の目盛りの上書き許可。これ設定しないとscale関連の設定が有効にならないので注意。
  scaleOverride : true,

  //以下設定で、縦軸のレンジは、最小値0から5区切りで35(0+5*7)までになる。
  //縦軸の区切りの数
  scaleSteps : 20,
  //縦軸の目盛り区切りの間隔
  scaleStepWidth : 10,
  //縦軸の目盛りの最小値
  scaleStartValue : 0,
  pointDot : true,
  //アニメーション設定
  animation : true,
  animationEasing : "easeOutQuart",
  //Y軸の表記（単位など）
  scaleLabel : "<%=value%>回",
  //ツールチップ表示設定
  showTooltips: false,
  //ドットの表示設定
  pointDot : true,
  //線を曲線にするかどうか。falseで折れ線になる。
  bezierCurve : false
}

//描画
function rendering(){
  var ctx = document.querySelector("#lineChartCanvas").getContext("2d");
  new Chart(ctx).Line(lineChartData,option);
}
