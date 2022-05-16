var express = require('express');
var fs = require('fs');
var path = require('path');
var PORT = process.env.PORT || 3000;

express()
  .use(express.static('./'))
  .listen(PORT, onListen);

function onListen() {
  console.log('\x1b[36m%s\x1b[0m', 'The popoway-me debug server is now running on localhost:' + PORT, '\nHit Control + C to terminate.');
}
