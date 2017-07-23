(function () {
    'use strict';
    
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