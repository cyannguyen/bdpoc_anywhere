cordova.define("ibm-plugin-email.EmailPlugin", function(require, exports, module) {
var exec = require('cordova/exec');

exports.coolMethod = function (arg0, success, error) {
    exec(success, error, 'EmailPlugin', 'coolMethod', [arg0]);
};

});
