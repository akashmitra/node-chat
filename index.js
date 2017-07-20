(function () {
  'use strict';

  var express = require('express');
  var app = express();
  var http = require('http').Server(app);
  var io = require('socket.io')(http);
  var port = process.env.PORT || 80;

  var chatevents = require('./events/chatevents');

  app.use(express.static('public'));
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/login.html');
  });

  io.on('connection', function (socket) {
    console.log('A user got in');

    /* On notification emit */
    socket.on('notification', function (msg) {
      chatevents.newUserEventHandler(msg, io);
    });


    /* On message emit */
    socket.on('chat message', function (msg) {
      chatevents.chatMsgEventHandler(msg, io);
    });

    /* On notification emit */
    socket.on('exit', function (msg) {
      chatevents.userExitHandler(msg, io);
    });


  });

  http.listen(port, function () {
    console.log('listening on *:' + port);
  });


}());
