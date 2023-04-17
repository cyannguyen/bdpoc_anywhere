/*
 * Licensed Materials - Property of IBM
 *
 * 5725-M39
 *
 * (C) Copyright IBM Corp. 2020 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

/// <reference group="Dedicated Worker" />

(function () {
    "use strict";
    importScripts("/www/WinJS/js/base.js");
    self.onmessage = function (event) {
        if (event.data.action === "initLogFile") {
            startFileLog();
        } else if (event.data.action == "log") {

            /*for (var i = 0; i < 10000; i++) {
                event.data.action += event.data.action;
            }*/

            WinJS.log(event.data.data);
        }
    }

    /**
       *
       *This section enables persistent logging on Windows apps (instead of the traditional javascript logging)
       * comment it in to have app log file log-<timestamp>Z.log called written to this directory:
       * C:\Users\<yourusername>\AppData\Local\Packages\<the app UUID>\LocalState
       * Usually you can just look into the most recently updated UUID directory to find the currently running app
       */

    function startFileLog() {
        // choose where the file will be stored:
        var fileDestination = Windows.Storage.ApplicationData.current.localFolder;
        //window.console.log("log file destination: " + fileDestination.path);
        var logger = new WinJS.Promise(function (complete) {
            var logfilename = new Date().toISOString().replace(/[:-]/g, "");
            logfilename = "log-" + logfilename + ".log";
            fileDestination.createFileAsync(logfilename,
                Windows.Storage.CreationCollisionOption.generateUniqueName)
                  .done(function (file) {
                      complete(file);
                  });
        });
        var length = 0;
        var actionFn = function (message, tag, type) {
            logger.then(function (file) {
                var m = WinJS.Utilities.formatLog(message, tag, type);
                try {
                   
                    return Windows.Storage.FileIO.appendTextAsync(file, m).then(function () {
                        return file;
                    });
                }
                catch (error) { };
            });
        };

        WinJS.Utilities.startLog({ action: actionFn });
    }
})();
