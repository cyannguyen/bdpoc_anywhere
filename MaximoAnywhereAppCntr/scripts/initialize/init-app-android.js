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

const fs = require("fs");
const { JSDOM } = require('jsdom');
const util = require('util');
const fsc = require('fs-extra');
const InitApp = require('./init-app.js');
const utils = require('../utils.js');
const path = require('path');
const { OS, CORDOVA_PLATFORM_CONFIG_FILE, CORDOVA_PATH, BASE_APP_IMAGES_PATH, PUSH_CERTIFICATE_NAME_ANDROID } = require('../Constants.js');

const currDir = process.cwd();

class InitAppAndroid extends InitApp {
    constructor(containerProps, appName, appPath, appDescriptorContents, defaultServer, appBaseDir, platformsConfig, pluginsConfig, logger) {
        super(containerProps, appName, appPath, appDescriptorContents, defaultServer, appBaseDir, platformsConfig, pluginsConfig, logger);

    }



    async installPlatform(cordovaPlatformPath, platformsConfig, createAppPath) {
        let platformPath = path.resolve(cordovaPlatformPath, 'android', platformsConfig.platforms.android.name)
        let cdvCommand = path.resolve(currDir + CORDOVA_PATH);
        let cmd = cdvCommand + ' platform add ' + platformPath + ' --force'
        await utils.executeCmd(cmd, createAppPath, this.log);
        
        //Copy Gradle to local if gradle home invalid path
        if(process.env['GRADLE_SPACE_EXS']){
            let gradlePath = path.resolve(createAppPath, 'platforms/android/gradle/wrapper/');
            await fsc.ensureDir(gradlePath);
            await fsc.copy(process.env['GRADLE_SPACE_EXS'], path.resolve(gradlePath, process.env['CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL']));
        }

    }

    async pushCertificateExsists(){
        return fsc.exists(path.resolve(this.baseAppPath, 'pushcertificate/android', PUSH_CERTIFICATE_NAME_ANDROID));
    }


    async copyPushCertificate(baseAppPath, targetPath) {
        let certExsist = await fsc.exists(
        					path.resolve(baseAppPath, 'pushcertificate/android', PUSH_CERTIFICATE_NAME_ANDROID));
        if (certExsist){
            try {
                await fsc.copyFile(
                	path.resolve(baseAppPath, 'pushcertificate/android/', PUSH_CERTIFICATE_NAME_ANDROID),
                	path.resolve(targetPath,  'platforms/android/app/', PUSH_CERTIFICATE_NAME_ANDROID));
            } catch (e) {
              
                throw e;
            }
        }
        
    }

    async copyImageResources(baseAppPath, descriptorDetails, outputLocation, memoizeName) {
        let srcIconPath = path.resolve(baseAppPath, BASE_APP_IMAGES_PATH, 'android');
        let imgExsist = await fsc.exists(path.resolve(srcIconPath, 'icon/drawable-hdpi-icon.png'));
        if (!imgExsist)
            srcIconPath = path.resolve(currDir, 'images', 'android');
        let targetPath = path.resolve(outputLocation, 'images/android');
        try {
            await fsc.ensureDir(targetPath);
        } catch (e) {
            if (e.code !== 'EEXIST')
                throw e;
        }
        await fsc.copy(srcIconPath, targetPath);
    }

}

module.exports = InitAppAndroid;
