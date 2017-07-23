(function () {
  'use strict';

  var express = require('express');
  var bodyParser = require('body-parser');
  var app = express();
  var http = require('http').Server(app);
  var io = require('socket.io')(http);
  var port = process.env.PORT || 80;

  var chatevents = require('./events/chatevents');
  var translation = require('./events/translation');

  app.use(express.static('public'));
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/login.html');
  });


  app.post('/fetchTranlation', function (req, res) {
    translation.fetchTranslations(req.body, function (msg) {
      console.log('The Translation is :: ', msg);
      res.status(200).send(msg);
    });
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
