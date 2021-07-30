cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-buildinfo.BuildInfo",
      "file": "plugins/cordova-plugin-buildinfo/www/buildinfo.js",
      "pluginId": "cordova-plugin-buildinfo",
      "clobbers": [
        "BuildInfo"
      ]
    },
    {
      "id": "cordova-plugin-camera.Camera",
      "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "Camera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverOptions",
      "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverOptions"
      ]
    },
    {
      "id": "cordova-plugin-camera.camera",
      "file": "plugins/cordova-plugin-camera/www/Camera.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "navigator.camera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverHandle",
      "file": "plugins/cordova-plugin-camera/www/ios/CameraPopoverHandle.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverHandle"
      ]
    },
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification",
      "file": "plugins/cordova-plugin-dialogs/www/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "cordova-plugin-file.DirectoryEntry",
      "file": "plugins/cordova-plugin-file/www/DirectoryEntry.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.DirectoryEntry"
      ]
    },
    {
      "id": "cordova-plugin-file.DirectoryReader",
      "file": "plugins/cordova-plugin-file/www/DirectoryReader.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.DirectoryReader"
      ]
    },
    {
      "id": "cordova-plugin-file.Entry",
      "file": "plugins/cordova-plugin-file/www/Entry.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.Entry"
      ]
    },
    {
      "id": "cordova-plugin-file.File",
      "file": "plugins/cordova-plugin-file/www/File.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.File"
      ]
    },
    {
      "id": "cordova-plugin-file.FileEntry",
      "file": "plugins/cordova-plugin-file/www/FileEntry.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileEntry"
      ]
    },
    {
      "id": "cordova-plugin-file.FileError",
      "file": "plugins/cordova-plugin-file/www/FileError.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileError"
      ]
    },
    {
      "id": "cordova-plugin-file.FileReader",
      "file": "plugins/cordova-plugin-file/www/FileReader.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileReader"
      ]
    },
    {
      "id": "cordova-plugin-file.FileSystem",
      "file": "plugins/cordova-plugin-file/www/FileSystem.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileSystem"
      ]
    },
    {
      "id": "cordova-plugin-file.FileUploadOptions",
      "file": "plugins/cordova-plugin-file/www/FileUploadOptions.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileUploadOptions"
      ]
    },
    {
      "id": "cordova-plugin-file.FileUploadResult",
      "file": "plugins/cordova-plugin-file/www/FileUploadResult.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileUploadResult"
      ]
    },
    {
      "id": "cordova-plugin-file.FileWriter",
      "file": "plugins/cordova-plugin-file/www/FileWriter.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileWriter"
      ]
    },
    {
      "id": "cordova-plugin-file.Flags",
      "file": "plugins/cordova-plugin-file/www/Flags.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.Flags"
      ]
    },
    {
      "id": "cordova-plugin-file.LocalFileSystem",
      "file": "plugins/cordova-plugin-file/www/LocalFileSystem.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.LocalFileSystem"
      ],
      "merges": [
        "window"
      ]
    },
    {
      "id": "cordova-plugin-file.Metadata",
      "file": "plugins/cordova-plugin-file/www/Metadata.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.Metadata"
      ]
    },
    {
      "id": "cordova-plugin-file.ProgressEvent",
      "file": "plugins/cordova-plugin-file/www/ProgressEvent.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.ProgressEvent"
      ]
    },
    {
      "id": "cordova-plugin-file.fileSystems",
      "file": "plugins/cordova-plugin-file/www/fileSystems.js",
      "pluginId": "cordova-plugin-file"
    },
    {
      "id": "cordova-plugin-file.requestFileSystem",
      "file": "plugins/cordova-plugin-file/www/requestFileSystem.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.requestFileSystem"
      ]
    },
    {
      "id": "cordova-plugin-file.resolveLocalFileSystemURI",
      "file": "plugins/cordova-plugin-file/www/resolveLocalFileSystemURI.js",
      "pluginId": "cordova-plugin-file",
      "merges": [
        "window"
      ]
    },
    {
      "id": "cordova-plugin-file.isChrome",
      "file": "plugins/cordova-plugin-file/www/browser/isChrome.js",
      "pluginId": "cordova-plugin-file",
      "runs": true
    },
    {
      "id": "cordova-plugin-file.iosFileSystem",
      "file": "plugins/cordova-plugin-file/www/ios/FileSystem.js",
      "pluginId": "cordova-plugin-file",
      "merges": [
        "FileSystem"
      ]
    },
    {
      "id": "cordova-plugin-file.fileSystems-roots",
      "file": "plugins/cordova-plugin-file/www/fileSystems-roots.js",
      "pluginId": "cordova-plugin-file",
      "runs": true
    },
    {
      "id": "cordova-plugin-file.fileSystemPaths",
      "file": "plugins/cordova-plugin-file/www/fileSystemPaths.js",
      "pluginId": "cordova-plugin-file",
      "merges": [
        "cordova"
      ],
      "runs": true
    },
    {
      "id": "cordova-plugin-file-opener2.FileOpener2",
      "file": "plugins/cordova-plugin-file-opener2/www/plugins.FileOpener2.js",
      "pluginId": "cordova-plugin-file-opener2",
      "clobbers": [
        "cordova.plugins.fileOpener2"
      ]
    },
    {
      "id": "cordova-plugin-file-transfer.FileTransferError",
      "file": "plugins/cordova-plugin-file-transfer/www/FileTransferError.js",
      "pluginId": "cordova-plugin-file-transfer",
      "clobbers": [
        "window.FileTransferError"
      ]
    },
    {
      "id": "cordova-plugin-file-transfer.FileTransfer",
      "file": "plugins/cordova-plugin-file-transfer/www/FileTransfer.js",
      "pluginId": "cordova-plugin-file-transfer",
      "clobbers": [
        "window.FileTransfer"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.Coordinates",
      "file": "plugins/cordova-plugin-geolocation/www/Coordinates.js",
      "pluginId": "cordova-plugin-geolocation",
      "clobbers": [
        "Coordinates"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.PositionError",
      "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
      "pluginId": "cordova-plugin-geolocation",
      "clobbers": [
        "PositionError"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.Position",
      "file": "plugins/cordova-plugin-geolocation/www/Position.js",
      "pluginId": "cordova-plugin-geolocation",
      "clobbers": [
        "Position"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.geolocation",
      "file": "plugins/cordova-plugin-geolocation/www/geolocation.js",
      "pluginId": "cordova-plugin-geolocation",
      "clobbers": [
        "navigator.geolocation"
      ]
    },
    {
      "id": "cordova-plugin-globalization.GlobalizationError",
      "file": "plugins/cordova-plugin-globalization/www/GlobalizationError.js",
      "pluginId": "cordova-plugin-globalization",
      "clobbers": [
        "window.GlobalizationError"
      ]
    },
    {
      "id": "cordova-plugin-globalization.globalization",
      "file": "plugins/cordova-plugin-globalization/www/globalization.js",
      "pluginId": "cordova-plugin-globalization",
      "clobbers": [
        "navigator.globalization"
      ]
    },
    {
      "id": "cordova-plugin-inappbrowser.inappbrowser",
      "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
      "pluginId": "cordova-plugin-inappbrowser",
      "clobbers": [
        "cordova.InAppBrowser.open",
        "window.open"
      ]
    },
    {
      "id": "cordova-plugin-iroot.IRoot",
      "file": "plugins/cordova-plugin-iroot/www/iroot.js",
      "pluginId": "cordova-plugin-iroot",
      "clobbers": [
        "IRoot"
      ]
    },
    {
      "id": "cordova-plugin-media-capture.CaptureAudioOptions",
      "file": "plugins/cordova-plugin-media-capture/www/CaptureAudioOptions.js",
      "pluginId": "cordova-plugin-media-capture",
      "clobbers": [
        "CaptureAudioOptions"
      ]
    },
    {
      "id": "cordova-plugin-media-capture.CaptureImageOptions",
      "file": "plugins/cordova-plugin-media-capture/www/CaptureImageOptions.js",
      "pluginId": "cordova-plugin-media-capture",
      "clobbers": [
        "CaptureImageOptions"
      ]
    },
    {
      "id": "cordova-plugin-media-capture.CaptureVideoOptions",
      "file": "plugins/cordova-plugin-media-capture/www/CaptureVideoOptions.js",
      "pluginId": "cordova-plugin-media-capture",
      "clobbers": [
        "CaptureVideoOptions"
      ]
    },
    {
      "id": "cordova-plugin-media-capture.CaptureError",
      "file": "plugins/cordova-plugin-media-capture/www/CaptureError.js",
      "pluginId": "cordova-plugin-media-capture",
      "clobbers": [
        "CaptureError"
      ]
    },
    {
      "id": "cordova-plugin-media-capture.MediaFileData",
      "file": "plugins/cordova-plugin-media-capture/www/MediaFileData.js",
      "pluginId": "cordova-plugin-media-capture",
      "clobbers": [
        "MediaFileData"
      ]
    },
    {
      "id": "cordova-plugin-media-capture.MediaFile",
      "file": "plugins/cordova-plugin-media-capture/www/MediaFile.js",
      "pluginId": "cordova-plugin-media-capture",
      "clobbers": [
        "MediaFile"
      ]
    },
    {
      "id": "cordova-plugin-media-capture.helpers",
      "file": "plugins/cordova-plugin-media-capture/www/helpers.js",
      "pluginId": "cordova-plugin-media-capture",
      "runs": true
    },
    {
      "id": "cordova-plugin-media-capture.capture",
      "file": "plugins/cordova-plugin-media-capture/www/capture.js",
      "pluginId": "cordova-plugin-media-capture",
      "clobbers": [
        "navigator.device.capture"
      ]
    },
    {
      "id": "cordova-plugin-mfp.mfp",
      "file": "plugins/cordova-plugin-mfp/bootstrap.js",
      "pluginId": "cordova-plugin-mfp",
      "runs": true
    },
    {
      "id": "cordova-plugin-mfp-jsonstore.jsonstore",
      "file": "plugins/cordova-plugin-mfp-jsonstore/bootstrap.js",
      "pluginId": "cordova-plugin-mfp-jsonstore",
      "runs": true
    },
    {
      "id": "cordova-plugin-native-spinner.SpinnerDialog",
      "file": "plugins/cordova-plugin-native-spinner/www/SpinnerDialog.js",
      "pluginId": "cordova-plugin-native-spinner",
      "clobbers": [
        "SpinnerDialog"
      ]
    },
    {
      "id": "cordova-plugin-network-information.network",
      "file": "plugins/cordova-plugin-network-information/www/network.js",
      "pluginId": "cordova-plugin-network-information",
      "clobbers": [
        "navigator.connection",
        "navigator.network.connection"
      ]
    },
    {
      "id": "cordova-plugin-network-information.Connection",
      "file": "plugins/cordova-plugin-network-information/www/Connection.js",
      "pluginId": "cordova-plugin-network-information",
      "clobbers": [
        "Connection"
      ]
    },
    {
      "id": "cordova-spatialite-storage.SQLitePlugin",
      "file": "plugins/cordova-spatialite-storage/www/SQLitePlugin.js",
      "pluginId": "cordova-spatialite-storage",
      "clobbers": [
        "SQLitePlugin"
      ]
    },
    {
      "id": "ibm-accessibility-plugin.ibm-accessibility-plugin",
      "file": "plugins/ibm-accessibility-plugin/www/ibm-accessibility-plugin.js",
      "pluginId": "ibm-accessibility-plugin",
      "clobbers": [
        "cordova.plugins.ibm-accessibility-plugin"
      ]
    },
    {
      "id": "ibm-device-orientation-plugin.ibm-device-orientation-plugin",
      "file": "plugins/ibm-device-orientation-plugin/www/ibm-device-orientation-plugin.js",
      "pluginId": "ibm-device-orientation-plugin",
      "clobbers": [
        "cordova.plugins.ibm-device-orientation-plugin"
      ]
    },
    {
      "id": "ibm-display-manager-plugin.ibm-display-manager-plugin",
      "file": "plugins/ibm-display-manager-plugin/www/ibm-display-manager-plugin.js",
      "pluginId": "ibm-display-manager-plugin",
      "clobbers": [
        "cordova.plugins.ibm-display-manager-plugin"
      ]
    },
    {
      "id": "ibm-map-plugin.MapPlugin",
      "file": "plugins/ibm-map-plugin/www/ibm-map-plugin.js",
      "pluginId": "ibm-map-plugin",
      "clobbers": [
        "cordova.plugin.ibm-map-pluigin"
      ]
    },
    {
      "id": "ibm-plugin-barcodescanner.BarcodeScanner",
      "file": "plugins/ibm-plugin-barcodescanner/www/BarcodeScanner.js",
      "pluginId": "ibm-plugin-barcodescanner",
      "clobbers": [
        "cordova.plugins.BarcodeScanner"
      ]
    },
    {
      "id": "ibm-plugin-cookiemanager.cookiemanager",
      "file": "plugins/ibm-plugin-cookiemanager/www/CookieManager.js",
      "pluginId": "ibm-plugin-cookiemanager",
      "clobbers": [
        "cordova.plugins.cookieManager"
      ]
    },
    {
      "id": "ibm-plugin-devicekeyboard.DeviceKeyBoardPlugin",
      "file": "plugins/ibm-plugin-devicekeyboard/www/DeviceKeyBoard.js",
      "pluginId": "ibm-plugin-devicekeyboard",
      "clobbers": [
        "cordova.plugins.DeviceKeyBoard"
      ]
    },
    {
      "id": "ibm-plugin-email.EmailPlugin",
      "file": "plugins/ibm-plugin-email/www/ISIEmailPlugin.js",
      "pluginId": "ibm-plugin-email",
      "clobbers": [
        "cordova.plugins.EmailPlugin"
      ]
    },
    {
      "id": "ibm-plugin-filepath.FilePath",
      "file": "plugins/ibm-plugin-filepath/www/FilePath.js",
      "pluginId": "ibm-plugin-filepath",
      "clobbers": [
        "cordova.plugins.FilePath"
      ]
    },
    {
      "id": "ibm-plugin-permissions.PermissionsPlugin",
      "file": "plugins/ibm-plugin-permissions/www/PermissionsPlugin.js",
      "pluginId": "ibm-plugin-permissions",
      "clobbers": [
        "cordova.plugins.PermissionsPlugin"
      ]
    },
    {
      "id": "phonegap-plugin-contentsync.ContentSync",
      "file": "plugins/phonegap-plugin-contentsync/www/index.js",
      "pluginId": "phonegap-plugin-contentsync",
      "clobbers": [
        "window.ContentSync",
        "window.Zip",
        "window.zip"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-buildinfo": "2.0.3",
    "cordova-plugin-camera": "4.1.1-dev",
    "cordova-plugin-device": "2.0.2",
    "cordova-plugin-dialogs": "2.0.2",
    "cordova-plugin-file": "6.0.1",
    "cordova-plugin-file-opener2": "2.2.1",
    "cordova-plugin-file-transfer": "1.7.1",
    "cordova-plugin-geolocation": "4.0.2",
    "cordova-plugin-globalization": "1.11.0",
    "cordova-plugin-inappbrowser": "3.1.0",
    "cordova-plugin-iroot": "0.8.1",
    "cordova-plugin-media-capture": "3.0.2",
    "cordova-plugin-mfp": "8.0.2019082207",
    "cordova-plugin-mfp-jsonstore": "8.0.2019072908",
    "cordova-plugin-native-spinner": "1.1.3",
    "cordova-plugin-network-information": "2.0.1",
    "cordova-plugin-okhttp": "2.0.0",
    "cordova-spatialite-storage": "1.2.0",
    "ibm-accessibility-plugin": "0.0.1",
    "ibm-device-orientation-plugin": "0.0.1",
    "ibm-display-manager-plugin": "0.0.1",
    "ibm-map-plugin": "0.0.1",
    "ibm-plugin-barcodescanner": "0.1.0",
    "ibm-plugin-cookiemanager": "0.2.3",
    "ibm-plugin-devicekeyboard": "0.1.0",
    "ibm-plugin-email": "0.0.1",
    "ibm-plugin-filepath": "0.1.0",
    "ibm-plugin-permissions": "0.1.0",
    "phonegap-plugin-contentsync": "1.4.2",
    "cordova-plugin-whitelist": "1.3.5"
  };
});