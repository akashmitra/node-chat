(function () {
    'use strict';

    $('form').submit(function () {
        login();

        $('#loginarea').hide();
        $('#loginmessage').show();
        $('#loginmessage').text('You can close this window now.');


        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("username", $('#username').val());
        } else {
           console.warn('For the time being no web storage support');
        }

        return false;
    });



    function login() {
        // var height = window.screen.height;
        // var width = (window.screen.width) / 4;
        // var coord = width;
        window.open('chat.html', 'newwindow', 'height=600,width=400,right=0');


        return false;
    }

}());