var MilkCocoa = require('milkcocoa');
var milkcocoa = new MilkCocoa("woodiesuswxb.mlkcca.com");
var ds = milkcocoa.dataStore("LIG");

function save(count){
  ds.push({v:count},function(err,pushed){
    console.log(err,pushed);
  });
}

function reset(){
  console.log("秒:",date.getSeconds());
  if(date.getSeconds() === 0) ditectCount = 0;
}

module.exports = {save: save, reset:reset};
