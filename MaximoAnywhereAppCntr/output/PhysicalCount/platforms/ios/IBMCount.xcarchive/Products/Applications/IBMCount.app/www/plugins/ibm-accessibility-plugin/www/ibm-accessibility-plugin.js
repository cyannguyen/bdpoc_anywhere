cordova.define("ibm-accessibility-plugin.ibm-accessibility-plugin", function(require, exports, module) {
var exec = require('cordova/exec');

exports.coolMethod = function (arg0, success, error) {
    exec(success, error, 'ibm-accessibility-plugin', 'coolMethod', [arg0]);
};

});
