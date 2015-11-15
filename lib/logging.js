'use strict'

var os = require('os');
var MilkCocoa = require('milkcocoa');
var milkcocoa = new MilkCocoa("woodiesuswxb.mlkcca.com");
var hostname = os.hostname();
var ds = milkcocoa.dataStore(hostname);

function save(count){
  ds.push({v:count},function(err,pushed){
    console.log(err,pushed);
  });
}

function reset(){
  console.log("秒:",date.getSeconds());
  if(date.getSeconds() === 0) ditectCount = 0;
}

function send(){
  ds.send({v:1},function(err, sended){
    console.log(err,sended);
  })
}

module.exports = {save: save, reset:reset, send:send};
