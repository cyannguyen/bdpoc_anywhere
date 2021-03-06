/*
   Licensed Materials - Property of IBM

   (C) Copyright 2015, 2016 IBM Corp.

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

// Public modules
var path = require('path');
var strings = require('ibm-strings');
var log = require('npmlog');
var util = require('util');

// MFP modules
var hookConsts = require('./../utils/hook-consts');
var externalizedStrings = require('./../externalizedStrings');
var MFPHook = require('./mfp-hook');
var AndroidBeforePluginInstall =
    require('./../android/android-before-plugin-install');
var BrowserBeforePluginInstall =
    require('./../browser/browser-before-plugin-install');

/*
This class determines which platform specific before_plugin_install hook to
instantiate, and invoke.
 */
function MFPBeforePluginInstall(context) {
    var platformPath;       // Path to platform
    var currentPlatforms;   // Installed platforms
    var projectRoot;        // Path to project
    var args;               // User arguments
    var pluginName;         // Name of plugin

    MFPHook.apply(this);
    MFPBeforePluginInstall.prototype = MFPHook.prototype;

    currentPlatforms = context.opts.cordova.platforms;
    projectRoot = path.resolve(context.opts.projectRoot);
    args = MFPBeforePluginInstall.prototype.getArguments(context.cmdLine);
    pluginName = context.opts.plugin.id;

    // If the user did not supply any platforms, use all the installed
    // platforms
    if (currentPlatforms.length === 0) {
        currentPlatforms =
            MFPBeforePluginInstall.prototype.getInstalledPlatforms(
                path.join(projectRoot, 'platforms')
            );
    }

    MFPBeforePluginInstall.prototype.setLogLevel(args);
    logSilly('Cordova context: ' + util.inspect(context));
    logSilly('Project root: ' + projectRoot);
    logSilly('Current platforms: ' + currentPlatforms);
    logSilly('Arguments: ' + args);

    /*
    Displays a log silly message. The log level must be set to silly.

    message - The message to log
     */
    function logSilly(message) {
        log.silly(hookConsts.MFP_BEFORE_PLUGIN_INSTALL, message);
    }

    /*
    Displays a log verbose message. The log level must be set to verbose.

    message - The message to log
     */
    function logVerbose(message) {
        log.verbose(hookConsts.MFP_BEFORE_PLUGIN_INSTALL, message);
    }

    /*
    Calls the platform specific hooks bassed on the platforms based. If an
    unsupported platform is passed, a warning message is displayed.

    currentPlatforms - Platforms to invoke hooks for
     */
    function invokePlatformHooks(currentPlatforms) {
        logVerbose('Invoking platform specific hooks.');

        // For each installed platform, invoke platform specific hook
        currentPlatforms.forEach(
            function(platformId) {
                platformPath = path.join(projectRoot, 'platforms', platformId);

                if (platformId === hookConsts.ANDROID)
                    new AndroidBeforePluginInstall(projectRoot).invokeHook();
                else if (platformId === hookConsts.BROWSER)
					new BrowserBeforePluginInstall(projectRoot).invokeHook();
            }
        );
    }

    /*
    Determines which hook platform specific before_plugin_install hook to
    instantiate, and invoke.
     */
    this.invokeHook = function() {
        logVerbose('Performing MFP before plugin install hook.');
        invokePlatformHooks(currentPlatforms);
    };

}

module.exports = MFPBeforePluginInstall;
