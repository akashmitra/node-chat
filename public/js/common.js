(function () {
    'use strict';

    $(document).ready(function () {

        var socket = io();

        var username = localStorage.getItem("username");
        $('#username').text(username);

        /* On new user entry */
        socket.emit('notification', username);

        /* On user leaving */
        window.addEventListener("beforeunload", function (e) {
            socket.emit('exit', username);
        }, false);


        /* Image Upload */
        $('#i').change(function () {
            var file = document.querySelector('input[type=file]').files[0];
            var reader = new FileReader();

            reader.addEventListener("load", function () {
                var message = {
                    type: 'image',
                    sender: username,
                    body: reader.result
                };
                //Emitting the message over the socket
                socket.emit('chat message', message);
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }

        });


        /* On entering message */
        $('form').submit(function () {
            var message = {
                type: 'text',
                sender: username,
                body: $('#m').val()
            };
            //Emitting the message over the socket
            socket.emit('chat message', message);
            // cleans the chatbox
            $('#m').val('');
            return false;
        });


        /* On receiving messages*/
        socket.on('chat message', function (msg) {
            var target;
            var printmsg;

            if (msg.sender === username) {
                target = $('<li class="self">');
            }
            else {
                target = $('<li class="other">');
            }

            if (msg.type === "text") {
                printmsg = `<div class="msg"><p class="sender">` + msg.sender + `</p><br><p class="msgbody">` + msg.body + `</p><time>` + msg.time + `</time></div></li>`;
            }
            else if (msg.type === "image") {
                console.log(msg.body);
                printmsg = `<div class="msg"><p class="sender">` + msg.sender + `</p><br><img src="` + msg.body + `" width="50%"><time>` + msg.time + `</time></div></li>`;
            }


            $('#messages').append(target.html(printmsg));
            $('.msgbody').emoticonize();
            // var temp = document.title ;
            // document.title = 'A message has arrived';
            window.scrollTo(0, document.body.scrollHeight);
        });


        /* On receiving notification */
        socket.on('notification', function (msg) {
            var printmsg = `<li class="notify">` + msg + `</li>`;
            $('#messages').append(printmsg);
            window.scrollTo(0, document.body.scrollHeight);
        });

    });

}());