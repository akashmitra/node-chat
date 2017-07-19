(function () {
  'use strict';

  var express = require('express');
  var app = express();
  var http = require('http').Server(app);
  var io = require('socket.io')(http);
  var moment = require('moment');
  var port = process.env.PORT || 80;

  app.use(express.static('public'));
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });

  io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
      msg.time = moment().calendar();
      io.emit('chat message', msg);
    });
  });

  http.listen(port, function () {
    console.log('listening on *:' + port);
  });


}());
