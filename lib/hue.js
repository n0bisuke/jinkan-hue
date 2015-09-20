var request = require('superagent');
var IPURL = 'https://www.meethue.com/api/nupnp';
var hueapi = ''; //
var USERNAME = 'lig-n0bisuke';

//Hue操作ようのAPIエンドポイント作成
function createEndpoint(ip){
  return 'http://'+ip+'/api/'+USERNAME+'/lights/';
}

request
  .get(IPURL)
  .set('Accept', 'application/json')
  .end(function(err, res){
    var ipadress = res.body[0].internalipaddress; //HueのIPアドレス
    hueapi = createEndpoint(ipadress);
  });

function ctrlHue(id, flag){
  if(hueapi === '')return;

  request
    .put(hueapi+id+'/state')
    .send({on: flag})
    .set('Accept', 'application/json')
    .end(function(err, res){
      console.log(res.body[0]);
    });
}

module.exports = ctrlHue;
