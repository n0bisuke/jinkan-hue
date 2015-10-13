import mraa from 'mraa';
import MilkCocoa from 'milkcocoa';
//import Milkcocoa from './lib/mlkccaController';
let milkcocoa = new MilkCocoa("noteifpi0dt2.mlkcca.com");
let ds = milkcocoa.dataStore('hikari');
let light = new mraa.Aio(0);

function lightRead(){
	let lightValue = light.read();
  lightValue = 50 - lightValue;
  ds.push({v:lightValue},(err,pushed)=>{
    console.log(pushed);
    setTimeout(lightRead, 10000);
  })
}

lightRead();
