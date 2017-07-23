(function () {
    'use strict';

    var moment = require('moment');
    
    exports.chatMsgEventHandler = function (msg, io) {
        msg.time = moment().calendar();
        io.emit('chat message', msg);
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