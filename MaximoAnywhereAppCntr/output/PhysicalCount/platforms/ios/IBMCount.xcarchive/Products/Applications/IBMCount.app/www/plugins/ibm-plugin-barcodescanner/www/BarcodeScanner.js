cordova.define("ibm-plugin-barcodescanner.BarcodeScanner", function(require, exports, module) {
var exec = require('cordova/exec');

exports.coolMethod = function (arg0, success, error) {
    exec(success, error, 'CodeScanner', 'coolMethod', [arg0]);
};

});
