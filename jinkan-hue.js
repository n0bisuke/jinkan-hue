var m = require('mraa');
var ctrlHue = require('./hue');
var myDigitalPin = new m.Gpio(13);
var motion = false; //人感センサ
var stateFlag = [false,false]; //人感センサの状態保存
var HUEID = 4; //操作するHueのID

myDigitalPin.dir(m.DIR_IN);

function periodicActivity(){
	var myDigitalValue =  myDigitalPin.read();
	// console.log('Gpio is ' + myDigitalValue);

  if(myDigitalValue){
    stateFlag[1] = true;
    motion = true;
  }else{
    stateFlag[1] = false;
    motion = false;
  }

  if(stateFlag[0] !== stateFlag[1]){
    ctrlHue(HUEID,motion);
    stateFlag[0] = stateFlag[1];
  }

	setTimeout(periodicActivity,1000);
}

periodicActivity();
