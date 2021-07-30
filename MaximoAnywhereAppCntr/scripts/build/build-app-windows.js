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


const utils = require('../utils.js')
const {BINARY_OUTPUT_FOLDER, OS} = require('../Constants.js');
const path = require('path');
const fs = require('fs-extra');
const klaw = require('klaw');

const BuildApp  = require('./build-app.js');
const currDir = process.cwd();


class BuildAppWindows extends BuildApp{
    constructor(containerProps, createdAppDir, info, logger){
       super(containerProps, createdAppDir, info, logger);
    }


    build(){
        let cdvCommand = path.resolve(currDir + '/node_modules/cordova/bin/cordova');
        let targetArch = this.containerProps[OS.WINDOWS]['targetArch'];
        let configType = this.containerProps[OS.WINDOWS]['targetConfig'];
        let appVersion =  this.info.defaultVersion.split('.').length <5?this.padVersion(this.info.defaultVersion):this.info.defaultVersion;
        let winAppIdentifier = "CordovaApp.Windows10_" + appVersion+ "_" + targetArch
        let cmd = cdvCommand + ' build windows --arch=' + targetArch  + " --" + configType;
        return utils.executeCmd(cmd, this.createdAppDir, this.log);
    }

    copyBinaries(appxSearchPath, outputLoc){
        return new Promise((resolve, reject) =>{
            let copyList = [];
            klaw(appxSearchPath)
                .on('readable', async  function (l) {
                    let item = null;
                    while ((item = this.read())) {
                        let appChkName = item.path.split(path.sep).pop();
                        
                        if((item.stats.isFile() && item.path.endsWith("appx") || item.path.endsWith("cer")) && appChkName.indexOf('CordovaApp.Windows10')>-1){
                            copyList.push(item.path);                
                        }
                    }
                })
                .on('end', async () => {
                    try{
                        await Promise.all(copyList.map(item =>{
                            if(item.endsWith('.cer')){
                                return fs.copy(item, path.resolve(outputLoc, 'anywhere-test_' + this.info.defaultVersion + '.cer'))
                            }else if(item.endsWith('.appx')){
                                return fs.copy(item, path.resolve(outputLoc, this.info.name + '-' + this.info.defaultVersion + '.appx'));
                            }
                        }));
                        resolve();
                    }catch(e){
                        reject(e);
                    }
                }).on('error', (e) => {
                    reject(e);
                });
           
        });

        // let appxPath = path.resolve(this.createdAppDir, 'platforms/windows/build/windows/', configType,targetArch, 'win10/Upload', winAppIdentifier, winAppIdentifier+'.appx');
        // let certPath = path.resolve(this.createdAppDir, 'platforms/windows/build/windows/', configType,targetArch, 'win10/Upload', winAppIdentifier, winAppIdentifier+'.cer');
        // let outputLoc = path.resolve(currDir, BINARY_OUTPUT_FOLDER, 'windows');
        // await fs.ensureDir(outputLoc);
        // await fs.copy(appxPath, path.resolve(outputLoc, this.info.name + '-' + this.info.defaultVersion + '.appx'));
        // await fs.copy(certPath, path.resolve(outputLoc, 'anywhere-test.' + appVersion+ "_" + targetArch + '.cer'));
    }

    padVersion(version){ 
        let v = version.split('.');
        let l = v.length;
        while (l < 4){
            v.push('0');
            l = v.length;
        }
        return v.join('.')
    }

    signAndVerify(){
        
    }

    async run(){
        try{

            await this.build();
            let appxSearchPath =path.resolve(this.createdAppDir, 'platforms/windows/AppPackages');
            let outputLoc = path.resolve(currDir, BINARY_OUTPUT_FOLDER, 'windows');
            await this.copyBinaries(appxSearchPath, outputLoc);

            logSummary.i(this.info.name, this.log.getTag(), "Windows app for " + this.info.name + " built successfully ");
            logSummary.i(this.info.name, this.log.getTag(), "Built " + this.info.name + " to: " + outputLoc);

            this.log.i("Windows app for " + this.info.name + " built successfully ");
            this.log.i("Built " + this.info.name + " to: " + outputLoc);

        }catch(ex){
            this.log.e(ex.message, ex);
            throw ex;
        }
    }
}

module.exports = BuildAppWindows;
