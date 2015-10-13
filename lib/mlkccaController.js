//書きかけ
'use strict'

import MilkCocoa from 'milkcocoa';
class Milkcocoa{
    constructor(APPID, DSNAME){
      let milkcocoa = new MilkCocoa(APPID+".mlkcca.com");
      // this.ds = milkcocoa
    }

    push(){
      console.log(111);
    }
}

export default Milkcocoa;
