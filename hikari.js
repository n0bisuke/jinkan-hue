import mraa from 'mraa';
import MilkCocoa from 'milkcocoa';
let pubnub = require("pubnub")({
    ssl           : true,  // <- enable TLS Tunneling over TCP
    publish_key   : "pub-c-8acbf410-aa4e-4f81-ac62-cc94b268ccda",
    subscribe_key : "sub-c-9705329c-dcc7-11e4-8fb9-0619f8945a4f"
});

import dweetClient from 'node-dweetio';
let dweetio = new dweetClient();

//import Milkcocoa from './lib/mlkccaController';
let milkcocoa = new MilkCocoa("noteifpi0dt2.mlkcca.com");
let ds = milkcocoa.dataStore('hikari');
let light = new mraa.Aio(0);

function lightRead(){
	let lightValue = light.read();
  lightValue = 50 - lightValue;
  // if(lightValue < 0) return;
  // pubnub(lightValue);

  dweetio.dweet_for("lig_hikari", {v:lightValue}, (err, dweet) => {
    console.log(dweet.thing); // "my-thing"
    console.log(dweet.content); // The content of the dweet
    console.log(dweet.created); // The create date of the dweet
  });

  pubnub.publish({
      channel   : 'lig_hikari',
      message   : { "hikari" : lightValue},
      callback  : (e) => { console.log( "SUCCESS!", e ); },
      error     : (e) => { console.log( "FAILED! RETRY PUBLISH!", e ); }
  });

  ds.push({v:lightValue},(err,pushed)=>{
    console.log(pushed);

    setTimeout(lightRead, 10000);
  })
}

lightRead();

function pubnub(val){
  pubnub.publish({
      channel   : 'lig_hikari',
      message   : { "hikari" : val},
      callback  : (e) => { console.log( "SUCCESS!", e ); },
      error     : (e) => { console.log( "FAILED! RETRY PUBLISH!", e ); }
  });
}
