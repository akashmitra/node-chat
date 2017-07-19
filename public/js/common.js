(function () {
    'use strict';

    $(document).ready(function () {

        var username = localStorage.getItem("username");
        $('#username').text(username);

        var socket = io();

        $('form').submit(function () {
            var message = {
                sender: username,
                body: $('#m').val()
            };
            //Emitting the message over the socket
            socket.emit('chat message', message);
            // cleans the chatbox
            $('#m').val('');
            return false;
        });


        socket.on('chat message', function (msg) {
            var target;

            if (msg.sender === username) {
                target = $('<li class="self">');
            }
            else {
                target = $('<li class="other">');
            }

            var printmsg = `<div class="msg"><p class="sender">` + msg.sender + `</p><br><p>` + msg.body + `</p><time>` + msg.time + `</time></div></li>`;

            $('#messages').append(target.html(printmsg));
            window.scrollTo(0, document.body.scrollHeight);
        });

    });

}());