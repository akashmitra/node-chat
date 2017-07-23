(function () {
    'use strict';

    $('form').submit(function () {
        login();

        $('#loginarea').hide();
        $('#loginmessage').show();
        $('#loginmessage').text('You can close this window now.');


        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("username", $('#username').val());
            localStorage.setItem("language", $('#language').val());
        } else {
           console.warn('For the time being no web storage support');
        }

        return false;
    });



    function login() {
        // var height = window.screen.height;
        // var width = (window.screen.width) / 4;
        // var coord = width;
        window.open('chat.html', 'newwindow', 'height=650,width=700,right=0');


        return false;
    }

}());