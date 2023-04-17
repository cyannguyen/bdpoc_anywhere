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

define("platform/attachment/AttachmentService",
["dojo/Deferred",
 "dojo/_base/lang",
 "dojo/_base/array",
 "platform/store/SystemProperties",
 "platform/attachment/MimeTypeService",
 "platform/attachment/FileService",
 "platform/comm/_ConnectivityChecker",
 "platform/util/PlatformConstants",
 "platform/store/_ResourceMetadataContext",
 "platform/warning/PlatformRuntimeWarning",
 "platform/exception/PlatformRuntimeException",
 "platform/logging/Logger",
 "platform/translation/MessageService",
 "platform/plugins/PermissionsPlugin",
 "platform/comm/HTTPHelper"],
 	function(Deferred, lang, arrayUtil, SystemProperties, MimeTypeService, FileService, ConnectivityChecker, PlatformConstants, ResourceMetadataContext, PlatformRuntimeWarning, PlatformRuntimeException, Logger, MessageService, PermissionsPlugin, HTTPHelper) {
	// needed to keep here because of UT
	(function(){
		if(typeof WL === "undefined"){
			WL = {};
		}
		if(typeof FileTransfer === "undefined"){
			window.FileTransfer = function(){};
			window.FileTransfer.prototype.upload = function(filePath, serverPath, onSuccess, onError, options){ onSuccess(); };
			window.FileTransfer.prototype.download = function(serverPath, targetFile, onSuccess, onError, acceptAllCerts, options){ onSuccess(); };
			window.FileTransfer.prototype.upload = function(serverPath, sourceFile){ onSuccess(); };
			window.FileTransfer.prototype.onprogress = function(){};
			window.FileTransfer.prototype.abort = function(){};
		}
		if(typeof FileUploadOptions === "undefined"){
			window.FileUploadOptions = function(){};
		}
		if(typeof FileTransferError === "undefined"){
			window.FileTransferError = function(){};
			window.FileTransferError.prototype.ABORT_ERR = 1;	
		}
	})();
	
	var serverURL = function(){
		var url = (WL && WL.StaticAppProps && WL.StaticAppProps.WORKLIGHT_BASE_URL) || "http://localhost:10080/maximo";
		
		/*if (WL.Client.getEnvironment() == WL.Environment.WINDOWS8 ){
			if(WL && WL.StaticAppProps && WL.StaticAppProps.APP_SERVICES_URL){
				url = WL.StaticAppProps.APP_SERVICES_URL.replace('/apps/services/','');
			}
			
		}*/
		//This is needed to handle extra trailing slash on iOS
		
		if (url.lastIndexOf("/") == url.length-1) {
			return url + "anywhereAttachment";
		} else {
			return url + "/anywhereAttachment";
		}
	};
	
	var ACCEPT_ALL_CERTIFICATES = true;
	
	return {	
		
		fileTransferPromise: null,
		
/**@memberOf platform.attachment.AttachmentService */
		downloadFileAsPromise: function(saveAsPath, rdfAbout, credentials){			
			/*=====
			 downloadFileAsPromise: function(saveAsPath, rdfAbout, credentials)
				 // summary:
				 //		Connects to the backend service and downloads the file identified by rdfAbout, saving it to the saveAsPath variable.  
				 //
				 //
				 // returns: A promise fulfilled with an object indicating the fullPath of the just downloaded file. 
				 //	In case of errors, an object with properties http_code (integer) and message (string) is passed to the rejected promise.
				 //
				 // description:
				 //	Download the resource identified by the RDF About and saves it to the saveAsPath. The default connection timeout is used while waiting
				 // the connection to be established. If the timeout exceeds, the promise is rejected with a null http_code.		
				 //
				 // NOTE: saveAsPath can be taken from FileService; credentials can be taken from UserAuthenticationManager 				 
				 // example:
				 //	|	var promise = AttachmentService.downloadFileAsPromise("/my/file.txt", "http://localhost/wodetails/AdsaAA/DOCKLINKS/123", "JSESSIONID=adsusoauda");
				 // |	promise.then(function(result){ alert(result.fullPath); }).otherwise(function(error){ alert(error.http_code + " " + error.message);});
			 },
			 =====*/
			Logger.trace("[ATTACHMENTSERVICE]: downloadFileAsPromise saveAsPath: " + saveAsPath + " rdfAbout: " + rdfAbout + " credentials: " + credentials);
			var transfer = new FileTransfer();
			var deferred = new Deferred(function(){
				transfer.abort();
			});
			this.fileTransferPromise = deferred.promise;
			
			var serverAddress = serverURL();
						
			var started = false;
			var currentProgress = 0;
			
			transfer.onprogress = function(progressEvent) {
				started = true;
			    if (progressEvent.lengthComputable) {			    	
			    	// total is half of the actual value
			    	deferred.progress((progressEvent.loaded / (progressEvent.total * 2)) * 100);
			    } else {
			    	deferred.progress(currentProgress += 2);
			    }
			};
			
			var onSuccess = function(fileEntry) {
				if(fileEntry.toURL()){
					Logger.trace("[ATTACHMENTSERVICE]: downloadFileAsPromise fullPath: " + fileEntry.toURL());					
					deferred.resolve({fullPath: fileEntry.toURL()});
				}else {
					Logger.trace("[ATTACHMENTSERVICE]: downloadFileAsPromise fullPath: " + fileEntry.fullPath);		
					deferred.resolve({fullPath: fileEntry.fullPath});	
				}
											
			}; 
			
			var onError = function(error) {				
				Logger.error("[ATTACHMENTSERVICE]: downloadFileAsPromise error: " + error);
				Logger.errorJSON("[ATTACHMENTSERVICE]: downloadFileAsPromise error: ", error);
			
				if(error.code == FileTransferError.ABORT_ERR){
					var exception = new PlatformRuntimeException("attachmentCouldNotConnect", [serverAddress]);
					deferred.reject({
						http_status: null, 
						message: exception.getMessage()
					});
				}
				else{
					var exception = new PlatformRuntimeException("attachmentDownloadError", [error.http_status]);
					deferred.reject({
						http_status: error.http_status, 
						message: exception.getMessage()
					});
				}		
			};
			
			var requestHeaders = {								
				"sessionid" : credentials,
				"url" : rdfAbout,
				"langcode" : (WL && WL.App && WL.App.getDeviceLocale() || 'en-US')
			};
			
			if (WL.Client.getMaximoAuthKey()) {
				requestHeaders.maxauth = WL.Client.getMaximoAuthKey();
			}

			if (WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD){

				let self = this;

				window.cordova.plugins.CookiesPlugin.getCookie(WL.StaticAppProps.WORKLIGHT_BASE_URL,function(cookie) {

					requestHeaders.cookie = cookie;

					var options = {
						headers: requestHeaders
					};
					
					var onPermissionsError = function(exception){
						deferred.reject({
							http_status: null, 
							message: exception.getMessage()
						});
					};
					
					Logger.trace("[ATTACHMENTSERVICE]: downloadFileAsPromise starting download serverAddress: " + encodeURI(serverAddress)
							+ " saveAsPath: " + saveAsPath);	
					Logger.traceJSON("[ATTACHMENTSERVICE]: downloadFileAsPromise download with options: ", options);
					
					PermissionsPlugin.checkAndGrantPermissions(PermissionsPlugin.WRITE_EXTERNAL_STORAGE, [PermissionsPlugin.WRITE_EXTERNAL_STORAGE, PermissionsPlugin.READ_EXTERNAL_STORAGE], 
						self, self._startDownload, [transfer, rdfAbout, saveAsPath, onSuccess, onError, ACCEPT_ALL_CERTIFICATES, options, started], onPermissionsError);
				} , function (error) {

					Logger.error("[ATTACHMENTSERVICE]: downloadFileAsPromise error: " + error);
					Logger.errorJSON("[ATTACHMENTSERVICE]: downloadFileAsPromise error: ",error);					
					deferred.reject(error);		

				});
			} else {
				var options = {
					headers: requestHeaders
				};
				 
				var onPermissionsError = function(exception){
					deferred.reject({
						http_status: null, 
						message: exception.getMessage()
					});
				};
				
				Logger.trace("[ATTACHMENTSERVICE]: downloadFileAsPromise starting download serverAddress: " + encodeURI(serverAddress)
						+ " saveAsPath: " + saveAsPath);	
				Logger.traceJSON("[ATTACHMENTSERVICE]: downloadFileAsPromise download with options: ", options);
				
				PermissionsPlugin.checkAndGrantPermissions(PermissionsPlugin.WRITE_EXTERNAL_STORAGE, [PermissionsPlugin.WRITE_EXTERNAL_STORAGE, PermissionsPlugin.READ_EXTERNAL_STORAGE], 
						this, this._startDownload, [transfer, rdfAbout, saveAsPath, onSuccess, onError, ACCEPT_ALL_CERTIFICATES, options, started], onPermissionsError);
			}
			return deferred.promise;
		},
		_startDownload: function(transfer, serverAddress, saveAsPath, onSuccess, onError, ACCEPT_ALL_CERTIFICATES, options,started) {
			
        	if(decodeURI(saveAsPath) != saveAsPath){
        		saveAsPath = decodeURI(saveAsPath);
        	}
			
			
        	if(decodeURI(saveAsPath) != saveAsPath){
        		saveAsPath = decodeURI(saveAsPath);
        	}
			
			transfer.download(encodeURI(serverAddress), saveAsPath, onSuccess, onError, ACCEPT_ALL_CERTIFICATES, options);	
			setTimeout(function(){				
				if(!started){
					transfer.abort();
				}
			}, SystemProperties.getConnectivityTimeout());
		},
		uploadFileAsPromise: function(sourceFilePath, rdfAbout, credentials, userOptions){
			/*=====
			 uploadFileAsPromise: function(sourceFilePath, rdfAbout, credentials, userOptions)
				 // summary:
				 //		Connects to the backend service and uploads the file at sourceFilePath to the resource identified by rdfAbout.
				 //		userOptions is an optional paramenter which can contain the following attributes:
				 //			name: the name to be used at server side - this is not the actual file name, but an alias that can be used by the backend system. Default to file name
				 //					without extension. E.g.: PHOTO1 (this is limited to 10 chars)		
				 //			description: a description for the file. E.g.: "This is how the asset has been left after be fixed" - Default to empty
				 //			category: a category to be used in backend to organize the file. E.g.: Photos ; Attachments - Default to Attachments
				 //
				 //
				 // returns: A promise fulfilled with an object with the http_code (integer), bytes_sent (integer) and message (string) 
				 //	In case of errors, an object with properties http_code (integer) and message (string) is passed to the rejected promise.
				 //
				 // description:
				 //	Upload the file at sourceFilePath to the resource identified by the RDF About. The default connection timeout is used while waiting
				 // the connection to be established. If the timeout exceeds, the promise is rejected with a null http_code.		
				 //
				 // NOTE: credentials can be taken from UserAuthenticationManager 				 
				 // example:
				 //	|	var promise = AttachmentService.uploadFileAsPromise("/my/file.txt", "http://localhost/wodetails/AdsaAA/DOCKLINKS/123", "JSESSIONID=adsusoauda");
				 // |	promise.then(function(result){ alert(result.http_code + " " + result.bytes_sent); }).otherwise(function(error){ alert(error.http_code + " " + error.message);});
			 },
			 =====*/
			
			Logger.trace("[ATTACHMENTSERVICE]: uploadFileAsPromise sourceFilePath: " + sourceFilePath + " rdfAbout: " + rdfAbout);
			
			var deferred = new Deferred();
			var serverAddress = serverURL();
			var transfer = new FileTransfer();
			var options = new FileUploadOptions();
			var started = false;
			var currentProgress = 0;
			var fileOptions = userOptions || {};
			var limit = SystemProperties.getProperty('si.attach.filenamelimit');
			var extension = FileService.extensionOf(sourceFilePath);
			var fileName = FileService.parseFileName((fileOptions.name|| sourceFilePath), false, (limit - (extension.length + 1)));
			var transactionid = fileOptions.transactionid;
			var anywhererefid = fileOptions.anywhererefid;
			
			options.fileKey = "file";
			options.fileName = fileName;			
			options.mimeType = MimeTypeService.mimeTypeForExtension(extension);
			
			options.headers = {
				//"Slug": fileName + "." + extension,
				"encslug": btoa(unescape(encodeURIComponent(fileName + "." + extension))),
				"Connection": "close",
				"sessionid": credentials,
				//"Cookie":credentials,
				"Accept-Language": (WL && WL.App && WL.App.getDeviceLocale() || 'en-US'),
				//"x-document-description": fileOptions.description || "",
				"x-document-encdescription": btoa(unescape(encodeURIComponent(fileOptions.description || ""))),
				"x-document-meta": fileOptions.category || "Attachments",
				"url": rdfAbout,
				"transactionid" : transactionid || "",
				 "x-document-externalid": anywhererefid?"anywhererefid:" + anywhererefid : "",
				"properties": fileOptions.properties || "",
				"csrftoken" : WL.Client.getCSRFToken() ,
		        "Content-Type" : MimeTypeService.mimeTypeForExtension(extension)
				
			};
			
			if (WL.Client.getMaximoAuthKey()) {
				options.headers.maxauth = WL.Client.getMaximoAuthKey();
			}
			
			options.chunkedMode = false;
			
			if (WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD){

				if ( sourceFilePath.indexOf('Documents') > -1 ) {
					sourceFilePath = cordova.file.documentsDirectory + sourceFilePath.substring(sourceFilePath.indexOf('Documents')+10, sourceFilePath.length);
				}

				if(sourceFilePath.indexOf("file://") < 0){
					sourceFilePath = "file://"+sourceFilePath;
				}
			}

			window.resolveLocalFileSystemURL(
					sourceFilePath, 
					function(fileEntry){				
						Logger.trace("[ATTACHMENTSERVICE]: uploadFileAsPromise fileEntry: " + fileEntry);
						Logger.traceJSON("[ATTACHMENTSERVICE]: uploadFileAsPromise fileEntry: ",fileEntry);				
						fileEntry.file(function (file) {
							
				            var reader = new FileReader();
				            reader.onloadend = function() {
				                // Create a blob based on the FileReader "result", which we asked to be retrieved as an ArrayBuffer
				                var blob = new Blob([new Uint8Array(this.result)], { type: MimeTypeService.mimeTypeForExtension(extension)});
				                var oReq = new XMLHttpRequest();
				                
				                oReq.open("POST", rdfAbout, true);
				                
				                oReq.setRequestHeader ("encslug", btoa(unescape(encodeURIComponent(fileName + "." + extension))));
				               // oReq.setRequestHeader ("Connection", "close");
				                oReq.setRequestHeader ("sessionid", credentials);
				                oReq.setRequestHeader ("Accept-Language", (WL && WL.App && WL.App.getDeviceLocale() || 'en-US'));
				                oReq.setRequestHeader ("x-document-encdescription", btoa(unescape(encodeURIComponent(fileOptions.description || ""))));
				                oReq.setRequestHeader ("transactionid" , transactionid || "");
				                oReq.setRequestHeader ("x-document-externalid", anywhererefid?"anywhererefid:" + anywhererefid : "");
				                oReq.setRequestHeader ("csrftoken" , WL.Client.getCSRFToken());
				                oReq.setRequestHeader ("Content-Type" , MimeTypeService.mimeTypeForExtension(extension));
				                oReq.setRequestHeader ("url" , rdfAbout);
				                oReq.setRequestHeader ("x-document-meta", fileOptions.category || "Attachments");
				                oReq.setRequestHeader ("properties" , fileOptions.properties || "");
				                
				    			if (WL.Client.getMaximoAuthKey()) {
				    				oReq.setRequestHeader ("maxauth" , WL.Client.getMaximoAuthKey());
				    			}
				                
								ConnectivityChecker.checkConnectivityAvailable().
									then(function(isConnected){
										if(isConnected) {			
				                			oReq.onload = function (result) {
				                    			// all done!
				    							Logger.trace("[ATTACHMENTSERVICE]: uploadFileAsPromise success result: " + result);
				    				
				    							if(result){
				    					
				    								//this try catch block will check if the response is a valid JSON before we return the promise to communicator manager
				    								try{
				    									Logger.trace("[ATTACHMENTSERVICE]: uploadFileAsPromise result: " + JSON.stringify(result));
														result.response = result.target.response;
				    									var parsableJsonResponse = JSON.parse(result.response);
				    									//the if statement was add just to be sure that we are returning a response that is differente of null or empty
				    									//in order to avoid duplication or error when merging data
				    									if(parsableJsonResponse){
				    										deferred.resolve({
				    											http_code: result.responseCode, 
				    											bytes_sent: result.bytesSent, 
				    											message: result.response
				    										});
				    									} 
														else {
				    										Logger.trace("[ATTACHMENTSERVICE] Empty JSON response returned from the server");
				    										deferred.reject({
				    											http_status: 1,
				    											//http_code: 1, 
				    											//bytes_sent: 0, 
				    											message: MessageService.createStaticMessage('attachUnexpectedResponse').getMessage()
				    										});
				    									}
				    								}
													catch (e){
				    									Logger.trace("[ATTACHMENTSERVICE] Fail to parse JSON from attachment response, error = " + e);
				    									deferred.reject({
				    										http_status: 1,
				    										//http_code: 1, 
				    										//bytes_sent: 0, 
				    										message: MessageService.createStaticMessage('attachUnexpectedResponse').getMessage()
				    									});
				    								}
				    							} 
												else {
				    								Logger.trace("[ATTACHMENTSERVICE] Empty result returned from the server");
				    								deferred.reject({
				    									//set to 1 in order to display any attach upload issue
				    									http_status: 1, 
				    									message: MessageService.createStaticMessage('attachUnexpectedResponse').getMessage()
				    								});
													//IJ25457
													window.UI.showToastMessage(MessageService.createStaticMessage('fileUploadFailed').getMessage());
				    							}
				                			};
											oReq.onerror = function() {
												Logger.trace("[ATTACHMENTSERVICE] HTTP Request Errored 'onload' call ");
												var exception = new PlatformRuntimeException("attachmentCouldNotConnect", [serverAddress]);
												deferred.reject({
													http_status: null, 
													message: exception.getMessage()
												});
											};
				                			// Pass the blob in to XHR's send method
				                			oReq.send(blob);
										} 
										else {
											var err = new Error("Connectivity Broken");
											Logger.trace("[ATTACHMENTSERVICE] uploadFileAsPromise Attachment Transaction Failed : Connectivity Broken ", err);
											deferred.reject(err);
										}
									}).otherwise(function() {
										var err = new Error("Device Not Connected");
                  						// Disconnected Scanario Handling to prevent Orphaned Attachment Transactions
										Logger.error("[ATTACHMENTSERVICE]: uploadFileAsPromise Device Not Online: ", err);
										deferred.reject(err);
									});
				            };
				            // Read the file as an ArrayBuffer
				            reader.readAsArrayBuffer(file);
						},function (err) { 
							console.error('error getting fileentry file!' + err); 
							deferred.reject(err); 
						});				
					},
					function(error){						
						Logger.error("[ATTACHMENTSERVICE]: uploadFileAsPromise error: " + error);
						Logger.errorJSON("[ATTACHMENTSERVICE]: uploadFileAsPromise error: ",error);					
						//IJ25457
						//deferred.reject(error);		
						var exception = new PlatformRuntimeException("attachmentUploadError", [error.code]);
						deferred.reject({
							//set to 1 in order to display any attach upload issue
							http_status: 1, 
							message: exception.getMessage()
						});
						window.UI.showToastMessage(MessageService.createStaticMessage('fileUploadFailed').getMessage());							
					}
				);
			
			/*
			transfer.onprogress = function(progressEvent) {
				started = true;
			    if (progressEvent.lengthComputable) {			    	
			    	// total is half of the actual value
			    	deferred.progress((progressEvent.loaded / (progressEvent.total * 2)) * 100);
			    } else {
			    	deferred.progress(currentProgress += 2);
			    }
			};
			
			var onSuccess = function(result) {				
				Logger.trace("[ATTACHMENTSERVICE]: uploadFileAsPromise success result: " + result);
				
				if(result){
					
					//this try catch block will check if the response is a valid JSON before we return the promise to communicator manager
					try{
						Logger.trace("[ATTACHMENTSERVICE]: uploadFileAsPromise result: " + JSON.stringify(result));
						var parsableJsonResponse = JSON.parse(result.response);
						//the if statement was add just to be sure that we are returning a response that is differente of null or empaty
						//in order to avoid duplication or error when merging data
						if(parsableJsonResponse){
							deferred.resolve({
								http_code: result.responseCode, 
								bytes_sent: result.bytesSent, 
								message: result.response
							});
						} else{
							Logger.trace("[ATTACHMENTSERVICE] Empaty JSON response returned from the server");
							deferred.reject({
								http_status: 1,
								//http_code: 1, 
								//bytes_sent: 0, 
								message: MessageService.createStaticMessage('attachUnexpectedResponse').getMessage()
							});
						}
						
						
					}catch (e){
						Logger.trace("[ATTACHMENTSERVICE] Fail to parse JSON from attachment response, error = " + e);
						deferred.reject({
							http_status: 1,
							//http_code: 1, 
							//bytes_sent: 0, 
							message: MessageService.createStaticMessage('attachUnexpectedResponse').getMessage()
						});
					}
					
				} else {
					Logger.trace("[ATTACHMENTSERVICE] Empaty result returned from the server");
					deferred.reject({
						//set to 1 in order to display any attach upload issue
						http_status: 1, 
						message: MessageService.createStaticMessage('attachUnexpectedResponse').getMessage()
					});
				}
				
			};
			
			var onError = lang.hitch(this, function(error) {
				Logger.error("[ATTACHMENTSERVICE]: uploadFileAsPromise error: " + error);
				Logger.errorJSON("[ATTACHMENTSERVICE]: uploadFileAsPromise error: ",error);

				if(error.code == FileTransferError.ABORT_ERR){
					var exception = new PlatformRuntimeException("attachmentCouldNotConnect", [serverAddress]);
					deferred.reject({
						http_status: null, 
						message: exception.getMessage()
					});
				}
				// conflicting transaction, it has already been consumed by Maximo
				else if(HTTPHelper.isConflictingTransaction(error.http_status)) {
					deferred.reject({
						http_status: error.http_status
						// there is no need to send a message as this conflict is handled upstream
					});
				}
				else{
					var exception = new PlatformRuntimeException("attachmentUploadError", [error.http_status]);
					deferred.reject({
						//set to 1 in order to display any attach upload issue
						http_status: 1, 
						message: exception.getMessage()
					});
				}				
			});

			
			Logger.trace("[ATTACHMENTSERVICE]: uploadFileAsPromise starting upload serverAddress: " + encodeURI(serverAddress)
					+ " sourceFilePath: " + sourceFilePath);	
			Logger.traceJSON("[ATTACHMENTSERVICE]: uploadFileAsPromise upload with options: ",options);
			
			transfer.upload(sourceFilePath, encodeURI(rdfAbout), onSuccess, onError, options);
			
			setTimeout(function(){
				if(!started){
					transfer.abort();
				}
			}, SystemProperties.getConnectivityTimeout());*/
			
			return deferred.promise;
		},
		_findAttachmentDataSetAsPromise: function(recordSet){
			// helper function to reduce complexity in the attachment association function
			var deferred = new Deferred();
			var metadata = recordSet.getMetadata();
			if(metadata.isAttachment){
				var owner = recordSet.getParent();
				var ownerName = owner ? owner.getMetadata().getResourceName() : metadata.getResourceName();								
				deferred.resolve({dataSet: recordSet, "ownerName": ownerName});
			}
			else{				
				var complexFields = metadata.getComplexFieldList();			
				var record = recordSet.getCurrentRecord();
				var found = false;
				for(var idx in complexFields){					
					var name = (complexFields[idx] || {}).referenceResource || "";	
					var candidateMeta = ResourceMetadataContext.getResourceMetadata(name);
					if(candidateMeta && candidateMeta.isAttachment === true || candidateMeta.isAttachment === 'true'){
						found = true;
						record.getModelDataSet(complexFields[idx].name, true).then(function(dataSet){
							deferred.resolve({"dataSet": dataSet, "ownerName": metadata.getResourceName()});
						}).otherwise(function(error){
							deferred.reject({message: error});
						});
						break;
					}
				}
				if(!found){
					var exception = new PlatformRuntimeException("attachmentResourceNotFound", [metadata.getResourceName()]);
					deferred.reject({
						message: exception.getMessage()
					});

					var recordElement = recordSet.getCurrentRecord();
					recordElement.set('fileNotFound', MessageService.createStaticMessage('fileUploadFailed').getMessage());
					//IJ25457
					window.UI.showToastMessage(MessageService.createStaticMessage('fileUploadFailed').getMessage());					
				}
			}
			return deferred.promise;
		},
		attachToRecordWithPromise : function(userName, attachmentInfo, record) {
			/*=====
			 attachToRecordWithPromise : function(userName, attachmentInfo, record)
				 // summary:
				 //		Performs all the tasks to attach the record in attachmentInfo to the attachment resource in record or in its first level relationship.
				 //		Tasks include the copy of the attachment from its origin to the base directory of user/record, update the attachment system fields
				 //		with the attachment info such as anywhereAttachName, anywherAttachPath, anywhereAttachSize, anywhereAttachDescription and anywhereAttachCategory.
				 //			- userName (string) is the current user name (see UserAuthenticationManager for details)
				 //			- attachmentInfo (ModelData) is an instance of PlatformAttachmentInfoResource
				 //			- record (ModelData) is the record to be the owner of the attachment (e.g.: workOrder, asset)
				 //
				 // returns: An empty promise when the process is done. 
				 //	In case of errors, an object with property message (string) is passed to the rejected promise.
			 },
			 =====*/
			var deferred = new Deferred();
			var self = this;
			this._findAttachmentDataSetAsPromise(record.getOwner()).then(function(info){
				var newAttachmentRecord = info.dataSet.createNewRecord();
				FileService.baseDirectoryForWithPromise(userName, info.ownerName, self.getOwnerRecordIdentifier(record)).then(function(result) {
					var targetDirectory = result.fullPath;
					var sourceFile = attachmentInfo.get("localPath");
					FileService.copyWithPromise(sourceFile, targetDirectory).then(function(result){
						newAttachmentRecord.set(PlatformConstants.ATTACH_LOCATION_ATTR, result.fullPath);
						newAttachmentRecord.set(PlatformConstants.ATTACH_DESCRIPTION_ATTR, attachmentInfo.get("description"));
						newAttachmentRecord.set(PlatformConstants.ATTACH_NAME_ATTR, attachmentInfo.get("name"));
						newAttachmentRecord.set(PlatformConstants.ATTACH_CATEGORY_ATTR, attachmentInfo.get("category"));
						newAttachmentRecord.set(PlatformConstants.ATTACH_SIZE_ATTR, attachmentInfo.get("fileSize"));
						newAttachmentRecord.setDateValue(PlatformConstants.ATTACH_CREATION_DATE, attachmentInfo.getAsDateOrNull("createDate"));
						deferred.resolve();
					}).otherwise(function(error){
						deferred.reject(error);
					});
				}).otherwise(function(error) {
					deferred.reject(error);
				});				
			}).otherwise(function(error){
				deferred.reject(error);
			});
			return deferred.promise;
		},
		
		//LAFIX for COOR (347964)
		/**
		 * Check if the url has a slash "/" at the end. If its true, just return the path and if not, add a slash at the of the string and return
		 * @param string path The full path from the device
		 */
		checkSlashFromPath: function(path){
			var slash = "/";
			var checkSlash = path.substr(-1);
		
			if(checkSlash !== slash) {
				path = path + slash;
			}
		  
		  return path;
		},

		/**
		 * Return the url encoded to fix special characters problems during the download
		 * @param string path The full path from the device
		 * @param string filename File name recovered from Maximo
		 */
		getUri: function(path, filename){
            var self = this;
			var uri  = null;
			var res  = null;
			
			uri = self.checkSlashFromPath(path) + filename;
			res = encodeURI(uri);
			
			return res;
		},
		downloadAttachmentForRecord: function(attachmentData, attachmentMetadata, ownerResourseName, ownerId, currentUser, sessionId){
			var deferred = new Deferred();
			var fileNameField = attachmentData["fullFileName"];
			var self = this;
			if(fileNameField != null){
				FileService.baseDirectoryForWithPromise(currentUser, ownerResourseName, ownerId).then(function(targetInfo){
					//Lafix - Vyshantha 
					var popUpExtensions = ["PNG", "JPG", "JPEG", "MP4", "M4A", "MP3", "WAV", "TXT", "PDF", "DOC", "DOCX"];
					var filesplitArr = fileNameField.split('.'), s = 0, filesplitstring = "";
					if (filesplitArr.length > 2) {
						while (s < filesplitArr.length - 1) {
							filesplitstring = filesplitArr[s++];
						}
					} else {
						filesplitstring = filesplitArr[0];
					}
					if (popUpExtensions.indexOf(filesplitArr[filesplitArr.length - 1]) > -1)
						fileNameField = filesplitstring + "." + filesplitArr[filesplitArr.length - 1].toLowerCase();
					//Lafix - end
					//LAFIX for COOR (347964);
					var targetFile = self.getUri(targetInfo.fullPath, fileNameField);
					self.downloadFileAsPromise(targetFile, attachmentData[PlatformConstants.LOCAL_UNIQUEID_ATTRIBUTE], sessionId).then(function(downloadResult){
								deferred.resolve(downloadResult.fullPath);
					}, null, 
					   function(progress) {
						deferred.progress(progress);
					}).otherwise(function(error){
						deferred.reject(error);
					});
				}).otherwise(function(error){
					deferred.reject(error);
				});
			}
			else{				
				Logger.errorJSON("[ATTACHMENTSERVICE]: downloadAttachmentForRecord resourceAttachmentHasNoTitle! attachmentData: ",
							attachmentData);				
				deferred.reject(new PlatformRuntimeWarning("resourceAttachmentHasNoTitle", [attachmentMetadata.getResourceName()]));						
			}
			return deferred.promise;
		},
		
		extensionOf : function(filePath, splitChar){
			if(splitChar == 'undefined' || splitChar == null){
				splitChar = ".";
			}
			var pos = filePath.lastIndexOf(splitChar);
			if(pos >= 0){
				return filePath.substring(pos + 1, filePath.length).toLowerCase();
			}
			else return "";
		},
		
		getOwnerRecordIdentifier : function(record, metadata){
			var identifier = null;
			if (!metadata && record.getMetadata){
				metadata = record.getMetadata();
			}
			if (metadata){
				identifier = metadata.getFieldForRemoteName('oslc:shortTitle');
				if (!identifier || !identifier.name){
					identifier = metadata.getFieldForRemoteName('dcterms:identifier');
				}
			}
			var recordId = null;
			if (identifier && identifier.name){
				recordId = (record.json?record.json[identifier.name]:record.get(identifier.name));
			}
			if (!recordId || !(typeof recordId == "string") || recordId.length == 0){
				recordId = (record.getId?record.getId():record._id);
			}
			return recordId;
		}

	};
});
