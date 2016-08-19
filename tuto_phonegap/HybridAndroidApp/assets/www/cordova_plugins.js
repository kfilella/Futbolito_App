cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-x-toast.Toast",
        "file": "plugins/cordova-plugin-x-toast/www/Toast.js",
        "pluginId": "cordova-plugin-x-toast",
        "clobbers": [
            "window.plugins.toast"
        ]
    },
    {
        "id": "cordova-plugin-x-toast.tests",
        "file": "plugins/cordova-plugin-x-toast/test/tests.js",
        "pluginId": "cordova-plugin-x-toast"
    },
    {
        "id": "cordova-plugin-hybrid.HybridBridge",
        "file": "plugins/cordova-plugin-hybrid/www/HybridBridge.js",
        "pluginId": "cordova-plugin-hybrid",
        "clobbers": [
            "HybridBridge"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "cordova-plugin-device": "1.1.2",
    "cordova-plugin-x-toast": "2.5.2",
    "cordova-plugin-hybrid": "1.0.0"
};
// BOTTOM OF METADATA
});