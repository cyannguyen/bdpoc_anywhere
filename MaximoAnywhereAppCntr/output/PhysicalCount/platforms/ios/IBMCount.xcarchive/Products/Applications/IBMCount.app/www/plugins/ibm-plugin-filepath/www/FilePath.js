cordova.define("ibm-plugin-filepath.FilePath", function(require, exports, module) {
var exec = require('cordova/exec');

exports.coolMethod = function (arg0, success, error) {
    exec(success, error, 'FilePath', 'coolMethod', [arg0]);
};

});
