var m = require('mraa');
//var ctrlHue = require('./lib/hue');
var logging = require('./lib/logging');
var myDigitalPin = new m.Gpio(13);
var motion = false; //人感センサ
var stateFlag = [false,false]; //人感センサの状態保存
var HUEID = 4; //操作するHueのID
var ditectCount = 0; //時間毎の検知回数
myDigitalPin.dir(m.DIR_IN);

function periodicActivity(){
	var date = new Date(); //時間を扱う

	if(date.getSeconds() === 0){ //時間が来たら保存して初期化
		logging.save(ditectCount);
		ditectCount = 0;
	}

	var myDigitalValue =  myDigitalPin.read();
  if(myDigitalValue){
    stateFlag[1] = true;
    motion = true;
  }else{
    stateFlag[1] = false;
    motion = false;
  }

	//状態が変化したときだけHueにHTTPリクエストを飛ばす
  if(stateFlag[0] !== stateFlag[1]){
    // ctrlHue(HUEID,motion);
    stateFlag[0] = stateFlag[1];
		if(stateFlag) logging.send();//点灯時
		ditectCount++;
  }

	setTimeout(periodicActivity,1000);
}

periodicActivity();
