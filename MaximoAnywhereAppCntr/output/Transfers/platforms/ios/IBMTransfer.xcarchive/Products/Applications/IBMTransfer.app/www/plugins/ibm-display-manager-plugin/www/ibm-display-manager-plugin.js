cordova.define("ibm-display-manager-plugin.ibm-display-manager-plugin", function(require, exports, module) {
var exec = require('cordova/exec');

exports.coolMethod = function (arg0, success, error) {
    exec(success, error, 'ibm-display-manager-plugin', 'coolMethod', [arg0]);
};

});
