(function () {
    'use strict';
    
    var apikey = "AIzaSyA21IKrlPw-Wck8fxuj3GM1NQKH0EmGWXk";
    var googleTranslate = require('google-translate')(apikey);

    exports.fetchTranslations = function (msg, callback) {
        /* Google Translate Code */
        googleTranslate.translate(msg.q, msg.target, function (err, translation) {
            if (err) {
                console.log('Oops there is an error :: ', err);
                throw err;
            }
            else {
                msg.translation = translation.translatedText;
                callback(msg);
            }
        });

    };

}());