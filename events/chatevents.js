(function () {
    'use strict';

    var moment = require('moment');
    var apiKey = 'AIzaSyA21IKrlPw-Wck8fxuj3GM1NQKH0EmGWXk';
    var googleTranslate = require('google-translate')(apiKey);

    exports.chatMsgEventHandler = function (msg, io) {
        msg.time = moment().calendar();
        io.emit('chat message', msg);

        /* Google Translate Code */
        // googleTranslate.translate(msg.body, 'bn', function (err, translation) {
        //     console.log(translation.translatedText);
        //     msg.body = translation.translatedText;
        //     io.emit('chat message', msg);
        // });

        return true;
    };

    exports.newUserEventHandler = function (msg, socketio) {
        console.log(msg + ' has joined');
        socketio.emit('notification', msg + ' has joined');
    };

    exports.userExitHandler = function (msg, io) {
        console.log(msg + ' has left');
        io.emit('notification', msg + ' has left');
    };

}());