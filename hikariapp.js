require('babel/register')({
  stage: 1 // for es 7 features
})

var server = require('./server.babel.js')

server.start();
