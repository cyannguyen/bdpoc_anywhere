/*
 * Licensed Materials - Property of IBM
 * "Restricted Materials of IBM"
 *
 * 5725-M39
 *
 * (C) COPYRIGHT IBM CORP. 2013,2020 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */

window.wlInitOptions = {
    connectOnStartup : false,
    timeout: 8000, 
	enableLogger : false,
	baseUrl: (new RegExp("^(https?://)?(((www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6})|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d{2,4})?(/[-\\w@\\+\\.~#\\?&/=%]*)?$").test(localStorage.getItem('maximo_url')) == true) ? localStorage.getItem('maximo_url'): ""
};


var mfpjsPromise = new Promise(function(resolve, reject){
    document.addEventListener("mfpjsloaded", ()=>{
		WL.StaticAppProps.mfpClientCustomInit = true;
		resolve();
	}, false);
});

var mfpjsonjsPromise = new Promise(function(resolve, reject){
    document.addEventListener("mfpjsonjsloaded", resolve, false);
});

//Ensure both WL js and jsonstore are loaded
Promise.all([mfpjsPromise, mfpjsonjsPromise]).then(async function(){
	
	if(window.webAppRuntime && app){
	    console.log("Manage Download")
		await app.manageWebApp();
	}
	
	if(device.platform.toLowerCase() === 'windows'){
		await clearLocalStorageForWindows();
	}

	injectAnywhereWorklight();

});

function injectAnywhereWorklight(){
	injectScript('js/anywhere-worklight.js', initializeWL, jsloadError);
}

function injectDojo(){
	injectScript('dojo/dojo.js', injectPerformanceUtil, jsloadError);
}

function injectPerformanceUtil(){
	injectScript('js/platform/performance/PerformanceUtil.js', injectStartupjs, jsloadError);
}

function injectStartupjs(){

}

function initializeWL(){
	//Merge WL Client Object
	//We could also do a deepMerge. TBD  the best strategy. This also lays out the apis jsonstore uses
	WLFoundation.Client.init(wlInitOptions);
	WLFoundation.Client = Object.assign(WL.Client, WLFoundation.Client); ///_state() used in jsonstore
	WLFoundation.App = Object.assign(WL.App, WLFoundation.App); //addActionReciever,removeActionReciever used in json store
	WLFoundation.Logger = Object.assign(WL.Logger, WLFoundation.Logger); //Logger.ctx used in jsonstore
	WL = Object.assign(WL, WLFoundation);
	//injectDojo();
	
}

function injectScript(url, onload, onerror) {
	var script = document.createElement("script");
	// onload fires even when script fails loads with an error.
	script.onload = onload;
	// onerror fires for malformed URLs.
	script.onerror = onerror;
	script.src = url;
	script.async = false;
	document.head.appendChild(script);
}

function injectScriptBody(url, onload, onerror) {
	var script = document.createElement("script");
	// onload fires even when script fails loads with an error.
	script.onload = onload;
	// onerror fires for malformed URLs.
	script.onerror = onerror;
	script.src = url;
	document.body.appendChild(script);
}

function jsloadError(){
	console.log("Failed to load library");
}


//we do this because of a defect where windows app uninstall fails to clean the localStorage associated with the app.
function clearLocalStorageForWindows(){
    return new Promise((resolve, reject) => {
        let collectionName = "windowsLocalStorageFlag";
        WL.JSONStore.init({ windowsLocalStorageFlag: {}}).then(()=>{
            WL.JSONStore.get(collectionName).findById(1, {}).then(result => {
                if(result.length == 0){
                    localStorage.removeItem("previousLoggedUsers");
                    WL.JSONStore.get(collectionName).add([{init:'true'}], {}).then(()=>{
                        resolve()
                    }).fail(err => {
                        reject(err)
                    });
                }else{
                    resolve();
                }
            }).fail(err =>{
                reject(err);
            });
        })
    });
	
}

