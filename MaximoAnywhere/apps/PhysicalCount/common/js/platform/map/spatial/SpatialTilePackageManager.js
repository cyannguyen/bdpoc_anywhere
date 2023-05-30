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

define("platform/map/spatial/SpatialTilePackageManager",
		[ "dojo/_base/declare",
            "dojo/on",
            "dojo/_base/lang",
		    "dojo/Deferred",
            "dojo/promise/all",
            "platform/plugins/PermissionsPlugin",
		    "platform/map/anywhere-tpk-src"],
        function(declare,on,lang,Deferred,all,PermissionsPlugin,zip) {

	 		var configFile = "";
			//var _inMemTilesIndex = [];
			var _inMemTilesObject = [];
			var _inMemTilesPath = [];
			var TILE_PATH = "" ;
			var _lodMap = [];
			var maxZoom = 0;
			var minZoom = 0;
			var target_id = "";
			var loadingTPKFile = false;
			var isTPKloadingComplete = false;
			var tempstateFolderName = "";
			var entriesFile = [];
			var directoriesToLoad = [];
			var mapServerPath = "";

			/** @class platform.map.esriTilePackageManager */
		return {

			/** @memberOf platform.map.esriTilePackageManager */
		    initMap: function (entries, isConfigFiles) {

		        var initmapdeferred = new Deferred();
		        
		        this.configFile = entries;
		        
		        if (isConfigFiles == true) {
		        	 this._lodMap = [];
			       
		        }

		         var that = this;
		        this._parseTPKEntries().then(function () {
		            initmapdeferred.resolve();
		        }).otherwise(function (err) {
		            initmapdeferred.reject();
		        });
		        return initmapdeferred; 
		    },


			
		    /**
            * Function for pulling out individual files from the .tpk/zip and storing
            * them in memory.
            * @param files
            * @param callback
            * @private
            */

		    _parseTPKEntries : function() {
		        var parseTPKdeferred = new Deferred();
		        var inMemTilesLength = this.configFile.length;
		        var token = 0;
		        

		        var that = this;

		        var callbackfunc = function (processedtoken,tpkdeferred,cbfunc) {

		            var nexttoken = processedtoken + 1;

		            if (inMemTilesLength === nexttoken || inMemTilesLength < nexttoken) {

		                var metadata = that._parseConfigData();
		                that.loadTPKConfig(metadata);
		                that.isTPKloadingComplete = true;
		                tpkdeferred.resolve();

		                return;

		            } else {
		                that._parseTPKEntry(nexttoken,tpkdeferred,cbfunc);
		            }
		        };

		        that._parseTPKEntry(token, parseTPKdeferred, callbackfunc);

		        return parseTPKdeferred;

		    },

		    _parseTPKEntry : function (token, parseTPKdeferred, callbackfunc) {

		        var fileentry = this.configFile[token];
		        
		        if (fileentry == null) {
		        	callbackfunc(token, parseTPKdeferred, callbackfunc);
		        } else {
		        	var name = fileentry.toLocaleUpperCase();
			        var index = name.indexOf("_ALLLAYERS",0);
			        if(index != -1){
			            this.TILE_PATH = name.slice(0,index);
			        }

			        var indexCDI = name.indexOf("CONF.CDI",0);
			        var indexXML = name.indexOf("CONF.XML",0);
			        var indexBUNDLE = name.indexOf("BUNDLE",0);
			        var indexBUNDLX = name.indexOf("BUNDLX",0);
			        var indexItemInfo = name.indexOf("MAPSERVER.JSON", 0);

			        if(indexCDI != -1 || indexXML != -1 || indexItemInfo != -1){
			            this._unzipTempConfFiles(token, parseTPKdeferred, callbackfunc);
			        } 
			        else if(indexBUNDLE != -1 || indexBUNDLX != -1){
			            this._unzipTileTempFiles(token, parseTPKdeferred, callbackfunc);
			        }
			        else {
			            callbackfunc(token, parseTPKdeferred, callbackfunc);
			        }
		        }
		    },
		    
		    _getOfflineStorage: function(directory_path) {
		    	var path = null;
		    	var cdvfile = "cdvfile";
		    	
		    	if (directory_path.indexOf("cdvfile") > -1) {
		    		path = directory_path;
		    	} else {
		    		if (WL.Client.getEnvironment()==WL.Environment.ANDROID) {
		    			if (directory_path.startsWith("file://")) {
		    				path = directory_path;
						} else {
							path = "file://" + directory_path;
						}
						
					} else if (WL.Client.getEnvironment()==WL.Environment.IPHONE) {
						if (directory_path.indexOf(cordova.file.documentsDirectory) == -1) {
							if (directory_path.startsWith("/")) {
								directory_path = directory_path.substring(1, directory_path.length);
							}
							path = cordova.file.documentsDirectory + directory_path;
						} else {
							path = directory_path;
						}
						
					} else { // Windows
						path = Windows.Storage.ApplicationData.current.localFolder.path + "/" + directory_path;
					}
		    	}
				console.log("_getOfflineStorage " + path);
				return path;
		    },
		    
		    checkTPKPathExists: function(directory_path) {
		    	var deferred = new Deferred();
		    	var checkPermissionPromise = this.checkPermission();
				checkPermissionPromise.then(lang.hitch(this, function(){
					var path = this._getOfflineStorage(directory_path);
					window.resolveLocalFileSystemURL(path , function(dirEntry) {
			    		deferred.resolve();
			    	}, function(error) {
			    		deferred.reject(); 
			    	});
				})).otherwise(lang.hitch(this, function(error){
					 deferred.reject(error);
				}));
		    	
		    	return deferred.promise;
		    },
		    
		     
		    /*
		     * This method searches for all the files in the TPK folder, recursively
		     */
		    listDirectory: function(directory_path, deferred, replicaFolderName) {
		    	

		        var self = this;
		        var path = this._getOfflineStorage(directory_path);
		         window.resolveLocalFileSystemURL(path , function(dirEntry) {
		                        var directoryReader = dirEntry.createReader();
		                        
		                       

		                        // Get a list of all the entries in the directory
		                        directoryReader.readEntries(function(entries) {
		                        	if (self.directoriesToLoad.length > 0) {
			                        	 self.directoriesToLoad.splice(0,1);
			                        }
		                                                            var i;
		                                                            for (i=0; i<entries.length; i++) {
		                                                            	var fullPath = entries[i].toInternalURL();
		                                                            	if (fullPath.indexOf(replicaFolderName) == -1) {
		                                                            		if( entries[i].isFile) {
			                                                                	self.entriesFile.push(fullPath);
			                                                                } else {
			                                                                	self.directoriesToLoad.push(1);
			                                                                }
		                                                            	}
		                                                            }
		                                                            for (i=0; i<entries.length; i++) {
		                                                                if( entries[i].isDirectory) {
		                                                                	var fullPath = entries[i].toInternalURL();
		                                                                	if (fullPath.indexOf(replicaFolderName) == -1) {
		                                                                		self.listDirectory(fullPath, deferred, replicaFolderName);
		                                                                	}
		                                                                } 
		                                                            }
		                                                            
		                                                            if (self.directoriesToLoad.length == 0) {
		                                                            	deferred.resolve();
		                                                            }
		                                                            
		                                                            
		                                                        },function(error) {
		                                                                  console.log("Failed to list directory contents: ", error);
		                                                                  deferred.reject(error);
		                                                              });
		                    });
		            
		        },
		        
		    loadTPK: function(localMapUrl, replicaFolderName) {
		    	var deferred = new Deferred();
		    	this.listDirectory(localMapUrl, deferred, replicaFolderName);
		    	
		    	
		    	return deferred.promise;
		    	
		    },
		    
		    hasTPKFilesToLoad: function(localMapUrl, replicaFolderName) {
		    	var deferred = new Deferred();
		    	this.entriesFile = [];
		    	this.directoriesToLoad = [];
		    	var path = this._getOfflineStorage(localMapUrl);
		    	var promiseLoadTPK = this.loadTPK(path, replicaFolderName);
				promiseLoadTPK.then(lang.hitch(this, function() {
					this.isTPKloadingComplete = false;
					var countFiles = this.entriesFile.length;
					if (countFiles > 0) {
						deferred.resolve();
					} else {
						deferred.reject();
					}
				}));
		    	return deferred.promise;
		    },

			createTPKFileStore : function(localMapUrl, replicaFolderName) {
					console.log("createTPKFileStore " + localMapUrl);
					var self = this;
					var createTPKFileStoreDeferred = new Deferred();
					var promiseHasTiles = this.hasTPKFilesToLoad(localMapUrl, replicaFolderName);
					promiseHasTiles.then(lang.hitch(this, function() {
						this.entriesFile = [];
						this.directoriesToLoad = [];
						
						
						
						if (self.isTPKloadingComplete) {
							createTPKFileStoreDeferred.resolve();
						} else {
							if (WL.Client.getEnvironment()!=WL.Environment.PREVIEW) {
								var onSuccess = function(fileSystem){
									var promiseLoadTPK = self.loadTPK(localMapUrl, replicaFolderName);
									promiseLoadTPK.then(lang.hitch(this, function() {
										console.log("Files loaded " + self.entriesFile);
										self._inMemTilesObject = {};
										self._inMemTilesPath = {};
										var configFiles = [];
										var tileFiles = [];
										self.maxZoom = 0;
										self.minZoom = 99;
										self.entriesFile.forEach(lang.hitch(this, function(entryFile) {
											var filename = entryFile.toUpperCase();
											if (filename.indexOf("CONF.XML") > -1 || filename.indexOf("CONF.CDI") > -1 
													|| filename.indexOf("MAPSERVER.JSON") > -1) {
												if (filename.indexOf("MAPSERVER.JSON") > -1){
													self.mapServerPath=filename;
												}
												configFiles.push(entryFile);
											} else {
												tileFiles.push(entryFile);
											}
											
											var index = filename.indexOf("_ALLLAYERS",0);
									        if(index != -1){
									        	self.TILE_PATH = filename.slice(0,index);
									        }
									        
									        var indexLevel = filename.indexOf("_ALLLAYERS/L",0);
									        if(indexLevel != -1){
									        	var zoomLevel = filename.slice(indexLevel+12,indexLevel+14);
									        	zoomLevel = Number(zoomLevel);
									        	//Get Max Zoom
									        	if (zoomLevel > self.maxZoom) {
									        		self.maxZoom = zoomLevel;
									        	}
									        	//Get Min Zoom
									        	if (zoomLevel < self.minZoom) {
									        		self.minZoom = zoomLevel;
									        	}
									        	
									        }
											
							                self._inMemTilesObject[filename] = true;
							                self._inMemTilesPath[filename] = entryFile;
										}));
										
										
										var promiseInitMap = self.initMap(configFiles, true);
										promiseInitMap.then(lang.hitch(this, function() {
											//self.initMap(tileFiles, false);
											createTPKFileStoreDeferred.resolve([self.maxZoom,self.minZoom]);
										}));
									}));
								};
								var onError = function(error){					
									console.log(error);				
								};
								
								if (WL.Client.getEnvironment()==WL.Environment.ANDROID && cordova.file && cordova.file.externalRootDirectory) {
									PermissionsPlugin.checkAndGrantPermissions(PermissionsPlugin.WRITE_EXTERNAL_STORAGE, [PermissionsPlugin.WRITE_EXTERNAL_STORAGE, PermissionsPlugin.READ_EXTERNAL_STORAGE],
											this, window.resolveLocalFileSystemURL, [cordova.file.externalRootDirectory, onSuccess, onError]);
								} else {
									PermissionsPlugin.checkAndGrantPermissions(PermissionsPlugin.WRITE_EXTERNAL_STORAGE, [PermissionsPlugin.WRITE_EXTERNAL_STORAGE, PermissionsPlugin.READ_EXTERNAL_STORAGE],
											this, window.requestFileSystem, [LocalFileSystem.PERSISTENT, 0, onSuccess, onError]);
								}
								
							} else {
								deferred.reject({message: MessageService.createStaticMessage('cannotTestFilesInSimulator').getMessage()});
							}
						}
					})).otherwise(lang.hitch(this, function() {
						//That's fine if there is no TPK to load, show the no tile image
						createTPKFileStoreDeferred.resolve();
					}));
					
					
					
					return createTPKFileStoreDeferred.promise;
				},
				
				getTPKCenterPoint : function () {
					var tempMapServerPath = undefined;
					if (this._inMemTilesObject && this.mapServerPath) {
						tempMapServerPath = this._inMemTilesObject[this.mapServerPath];
					}
					
					if(tempMapServerPath == undefined ){
						console.log("Error in getting MapServerPath return X=0, Y=0");
						return [0,0];
					} 
					
					tempMapServerPath= JSON.parse(tempMapServerPath);
					var tempInitialExtent = tempMapServerPath.contents.initialExtent;
					var xMin = tempInitialExtent.xmin;
					var XMax = tempInitialExtent.xmax;
					var YMin = tempInitialExtent.ymin;
					var YMax = tempInitialExtent.ymax;
					return [(xMin + XMax) / 2 , (YMin + YMax) / 2];
				},	

		    showProgressBar : function (target) {

		        var progressbar = document.createElement("progress");
		        var stylewidth = target.style.width;

		        progressbar.setAttribute("id", "proBar");
		        progressbar.setAttribute("max", 100);
		        progressbar.setAttribute("value", 0);
		        progressbar.setAttribute("style", "width:" + stylewidth + ";");

		        target.appendChild(progressbar);
		    },
		    
		    /**
			 * Check if the user has permission to read/write the TPK folder
			 */
			checkPermission : function() {
				var deferred = new Deferred();
				if (WL.Client.getEnvironment()!=WL.Environment.PREVIEW) {
					var onSuccess = function(fileSystem){
						deferred.resolve();
					};
					var onError = function(error){					
						Logger.log(error);	
						deferred.reject();
					};
						
					if (WL.Client.getEnvironment()==WL.Environment.ANDROID && cordova.file && cordova.file.externalRootDirectory) {
						PermissionsPlugin.checkAndGrantPermissions(PermissionsPlugin.WRITE_EXTERNAL_STORAGE, [PermissionsPlugin.WRITE_EXTERNAL_STORAGE, PermissionsPlugin.READ_EXTERNAL_STORAGE],
								this, window.resolveLocalFileSystemURL, [cordova.file.externalRootDirectory, onSuccess, onError]);
					} else {
						PermissionsPlugin.checkAndGrantPermissions(PermissionsPlugin.WRITE_EXTERNAL_STORAGE, [PermissionsPlugin.WRITE_EXTERNAL_STORAGE, PermissionsPlugin.READ_EXTERNAL_STORAGE],
								this, window.requestFileSystem, [LocalFileSystem.PERSISTENT, 0, onSuccess, onError]);
					}
				} else {
					deferred.reject();
				}
				return deferred.promise;
			},

		    updateProgressBar : function (inProgressValue, maxValue) {
		        var number = Math.floor((100 / maxValue) * inProgressValue);
		        if (number > 100) {
		        	number = 100;
		        }
		        dojo.publish('_updatePercentComplete', [number+"%", 'loadingTiles']);
		        
		    },
			
		    /**
			 * Retrieve XML config files
			 * 
			 * @param token
			 * @private
			 */

			_unzipTempConfFiles: function (token, deferred, callback) {

			    var that = this;
			    console.log("resolve local file system URL time :: " + new Date().toUTCString() + " Token :: " + token);
				
			    var name = that.configFile[token];
				
			    window.resolveLocalFileSystemURL(name, function (fileEntry) {
			        console.log("Found file ");
			        fileEntry.file(function (file) {
			            var reader = new FileReader();

			            reader.onloadend = function (event) {
			                var filename = that.configFile[token].toLocaleUpperCase();
			                that._inMemTilesObject[filename] = event.target.result;

			                console.log("TPK Config File Loaded :: " + filename);

			                 that.updateProgressBar(token, that.configFile.length - 3);
			                //callback(deferred, token, callback);
			                callback(token, deferred, callback);
			            };

			            reader.onerror = function (event) {
			                console.error("File could not be read! Code " + event.target.error.message);
			            };

			            reader.readAsText(file);

			        }, function (err) {
			            console.log("Error in getting file " + that.configFile[token]);
			        });
			    }, function (err) {
			        console.log("Error in getting file entry " + that.configFile[token]);
			    });
			},

			_parseConfigData: function () {
				var metadata = {};
				var x2js = new O.esri.TPK.X2JS();
				var m_conf = this._inMemTilesObject[this.TILE_PATH + "CONF.XML"];
				var m_conf_i = this._inMemTilesObject[this.TILE_PATH + "CONF.CDI"];

				var jsConfText = x2js.xml_str2json(m_conf);
				var jsConfiText = x2js.xml_str2json(m_conf_i);
				
				if (jsConfText == null) {
					return metadata;
				}

				var cacheInfo = jsConfText.CacheInfo;

				

				this.tileFormat = cacheInfo.TileImageInfo.CacheTileFormat;

				metadata.spatialReference = {
					"wkid" : parseInt(cacheInfo.TileCacheInfo.SpatialReference.WKID) ,
					"latestWkid" : parseInt(cacheInfo.TileCacheInfo.SpatialReference.WKID)
				};

				var lods = cacheInfo.TileCacheInfo.LODInfos.LODInfo;
				var finalLods = [];
				for (var i = 0; i < lods.length; i++) {
					finalLods.push({
						"level": parseFloat(lods[i].LevelID),
						"resolution": parseFloat(lods[i].Resolution),
						"scale": parseFloat(lods[i].Scale)});
				}

				metadata.tileInfo = {
					rows : parseInt(cacheInfo.TileCacheInfo.TileRows),
					cols : parseInt(cacheInfo.TileCacheInfo.TileCols),
					dpi : parseInt(cacheInfo.TileCacheInfo.DPI),
					format : cacheInfo.TileImageInfo.CacheTileFormat,
					compressionQuality : parseInt(cacheInfo.TileImageInfo.CompressionQuality),
					spatialReference : {
						 "wkid" : parseInt(cacheInfo.TileCacheInfo.SpatialReference.WKID) ,
						 "latestWkid" : parseInt(cacheInfo.TileCacheInfo.SpatialReference.WKID)
					},
					lods : finalLods
				};

				var envelopeInfo = jsConfiText.EnvelopeN;
				var xmin = parseFloat(envelopeInfo.XMin);
				var ymin = parseFloat(envelopeInfo.YMin);
				var xmax = parseFloat(envelopeInfo.XMax);
				var ymax = parseFloat(envelopeInfo.YMax);

				metadata.initialExtent = {
					"xmin": xmin,
					"ymin": ymin,
					"xmax": xmax,
					"ymax": ymax,
					spatialReference : {
						"wkid" : parseInt(envelopeInfo.SpatialReference.WKID) ,
						"latestWkid" : parseInt(envelopeInfo.SpatialReference.LatestWKID)
					}
				};

				metadata.fullExtent = {
					"xmin": xmin,
					"ymin": ymin,
					"xmax": xmax,
					"ymax": ymax,
					spatialReference : {
						"wkid" : parseInt(envelopeInfo.SpatialReference.WKID) ,
						"latestWkid" : parseInt(envelopeInfo.SpatialReference.LatestWKID)
					}
				};

				return metadata;
			},

		    /**
			 * Retrieve binary tile files as ArrayBuffers
			 * @param token
			 * @private
			 */
			_unzipTileTempFiles: function (token, deferred, callback, fileName) {
				
			    var that = this;
			    
			    var name;
			    
			    if (fileName != null) {
			    	name = fileName;
			    } else {
			    	name = that.configFile[token]
			    }
			    
			    console.log("resolve local file system URL time :: " + new Date().toUTCString() + " File name :: " + name);
				
			    window.resolveLocalFileSystemURL( name , function (fileEntry) {
			        console.log("Found file ");
			        fileEntry.file(function(file) {
			            var reader = new FileReader();
						
			            reader.onloadend = function (event) {
			                var filename = name.toLocaleUpperCase();
			                that._inMemTilesObject[filename] = event.target.result;
			                callback(token, deferred, callback);
			            };
						
			            reader.onerror = function (event) {
			                console.error("File could not be read! Code " + event.target.error.message);
			            };

			            reader.readAsArrayBuffer(file);
						
			        }, function(err) {
			            console.log("Error in getting file " + that.configFile[token] );
			        });
			    }, function (err) {

			        

			        console.log("Error in getting file entry " + that.configFile[token]);
			        deferred.reject();
			        throw "Error in getting file entry " + that.configFile[token];
			        //that.getWinBaseMapTPK(that.target, that.deferred, that.fileNameWithDir).then(function () {
			        //    that.deferred.resolve();
			        //}, function (err) {
			        //    console.log("Error in getting file entry on second attempt "); 

			        //});
			        // Retry if file load failed
			        
			    });
	   
			},
			
			unloadTPK: function() {
				this.isTPKloadingComplete = false;
				this._inMemTilesObject = [];
				this._inMemTilesPath = [];
			},

			/**
			 * Calculate the size of an Object based on whether or not the item is enumerable.
			 * Native Objects don't have a built in size property.
			 * More info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
			 * @param obj
			 * @returns {number}
			 * @constructor
			 */

			ObjectSize: function (obj) {
				var size = 0, key;
				for (key in obj) {
					if (obj.hasOwnProperty(key)) {
						size++;
					}
				}
				return size;
			},

			loadTPKConfig : function  (metadata) {

				var MercatorZoomLevels = {
							0: 156543.033928,
							1: 78271.5169639999,
							2: 39135.7584820001,
							3: 19567.8792409999,
							4: 9783.93962049996,
							5: 4891.96981024998,
							6: 2445.98490512499,
							7: 1222.99245256249,
							8: 611.49622628138,
							9: 305.748113140558,
							10: 152.874056570411,
							11: 76.4370282850732,
							12: 38.2185141425366,
							13: 19.1092570712683,
							14: 9.55462853563415,
							15: 4.77731426794937,
							16: 2.38865713397468,
							17: 1.19432856685505,
							18: .597164283559817,
							19: .298582141647617,
							20: .14929107082381,
							21: .07464553541191,
							22: .0373227677059525,
							23: .0186613838529763
						};

				var sr = metadata.spatialReference.latestWkid || metadata.spatialReference.wkid;
				if (sr === 102100 || sr === 3857) {
					var arcgisLODs = metadata.tileInfo.lods;
					var correctResolutions = MercatorZoomLevels;
					for (var i = 0; i < arcgisLODs.length; i++) {
						var arcgisLOD = arcgisLODs[i];
						for (var ci in correctResolutions) {
							var correctRes = correctResolutions[ci];
							if (this._withinPercentage(arcgisLOD.resolution, correctRes)) {
								this._lodMap[ci] = arcgisLOD.level;
								break;
							}
						}
					}
					//that.fire("lodmap")
				} else {
					console.log("L.esri.TiledMapLayer is using a non-mercator spatial reference.");
				}

			},

			_withinPercentage : function  (a, b) {
				var zoomOffsetAllowance = .1;
				var percentage = zoomOffsetAllowance ;
				var diff = Math.abs(a / b - 1);
				return diff < percentage;
			},
			
			
			_loadFile: function(url) {
				var deferred = new Deferred();
				this._loadFilesForUrl(url, deferred);
				return deferred.promise;
			},
			
			_loadFilesForUrl: function(url, deferred) {
				var self = this;
				if(this._inMemTilesObject[url] == true) {
					this._inMemTilesObject[url] = false;
					var filePath = this._inMemTilesPath[url];
					var callbackfunc = function () {
						deferred.resolve();
			        };
			        
					this._unzipTileTempFiles(null, deferred, callbackfunc, filePath);
				} else {
					if (this._inMemTilesObject[url] == false) {
						//The file is loading, wait for it.
						setTimeout(lang.hitch(this, function() {
							this._loadFilesForUrl(url, deferred);
						}), 1000);
					} else {
						deferred.resolve();
					}
					
				}
				
			},
			
			_checkFilesAlreadyLoaded: function(url,level,row,col) {
				var deferred = new Deferred();
				
				var snappedRow = Math.floor(row / 128) * 128;
				var snappedCol = Math.floor(col / 128) * 128;
				var layersDir = this.TILE_PATH + "_alllayers";
				var path = this._getCacheFilePath(layersDir, level, snappedRow, snappedCol).toLocaleUpperCase();
				
				var promises = [];
				var promiseBundle = this._loadFile(path+".BUNDLE");
				promises.push(promiseBundle);
				var promiseBundlx = this._loadFile(path+".BUNDLX");
				promises.push(promiseBundlx);
				
				all(promises).then(lang.hitch(this, function() {
					deferred.resolve();
				}));
				
				return deferred.promise;
				
			},

			/**
			 * Overrides getTileUrl method
			 * @param level
			 * @param row
			 * @param col
			 * @returns {string}
			 */

			getTileUrl: function (tilePoint){
				var deferred = new Deferred();
				var level,row,col;
				level = tilePoint.z;
				row = tilePoint.y;
				col = tilePoint.x;

				var layersDir = this.TILE_PATH + "_alllayers";
				var url = this._getCacheFilePath(layersDir,level,row,col);
				
				
				var promiseCheckFileLoaded = this._checkFilesAlreadyLoaded(url, level, row, col);
				promiseCheckFileLoaded.then(lang.hitch(this, function() {
					if(this._inMemTilesObject != {}) {
						/* temporary URL returned immediately, as we haven't retrieved the image from the indexeddb yet */
						var tileid = "void:/" + level + "/" + row + "/" + col;
						var result = this._getInMemTiles(layersDir, level, row, col);
						var imgURL;

						if (result) {
							console.log("found tile offline", url);
							var png =  "data:image/png;base64,";
							switch(this.tileFormat) {
								case this.tileFormat:
									imgURL = "data:image/jpg;base64," + result;
									break;
								case "PNG":
									imgURL = png + result;
									break;
								case "PNG8":
									imgURL = png + result;
									break;
								case "PNG24":
									imgURL = png + result;
									break;
								case "PNG32":
									imgURL = png + result;
									break;
								default:
									imgURL = "data:image/jpg;base64," + result;
							}
						}
						else {
							console.log("tile is not in the offline store", url);
							imgURL = "data:image/png;base64,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pmk0TROPj48Hn3l4eIimaSJN06O3A4NJwDMxm82ibdtXo4D5fB6r1Sp+//4dz8/Pw5H+6ekpdrtdJEkS8/n8S/9f713ie3vaceo9x557QAB451Sgfyin34HKshweunk5HzAej2MymXz5+f9nbjJyI9L39Wu5XP55+XQZ39uxR4Z3u90wSXjqEV0wAjhjx47oaZq63Me/ZhIQBAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEAAbAJQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEAvqe/BwCeKjUweoA8pQAAAABJRU5ErkJggg==";
						}

						deferred.resolve(imgURL);
					}
				}));
				
				
				
				return deferred.promise;
			},

			_getInMemTiles: function (layersDir,level,row,col){

				var snappedRow = Math.floor(row / 128) * 128;
				var snappedCol = Math.floor(col / 128) * 128;

				var path = this._getCacheFilePath(layersDir, level, snappedRow, snappedCol).toLocaleUpperCase();


				var offset;
				var bundleIndex = path + ".BUNDLE";
				var bufferI = this._inMemTilesObject[bundleIndex];
				var bufferX = this._inMemTilesObject[path + ".BUNDLX"];

				if(bufferI !== undefined || bufferX !== undefined) {
					offset = this._getOffset(level, row, col, snappedRow, snappedCol);
					var pointer = this._getPointer(bufferX, offset);

					return this._buffer2Base64(bufferI,pointer);
				}
				else{
					console.log("_getInMemTiles Error: Invalid values");
				}
			},


			/**
			 * Returns a pointer for reading a BUNDLE binary file as based on the given offset.
			 * @param buffer
			 * @param offset
			 * @returns {Uint8}
			 * @private
			 */
			_getPointer : function (/* ArrayBuffer */ buffer,offset){
				var snip = buffer.slice(offset);
				var dv =  new DataView(snip,0,5);

				var nume1 = dv.getUint8(0,true);
				var nume2 = dv.getUint8(1,true);
				var nume3 = dv.getUint8(2,true);
				var nume4 = dv.getUint8(3,true);
				var nume5 = dv.getUint8(4,true);

				var value = nume5;
				value = value * 256 + nume4;
				value = value * 256 + nume3;
				value = value * 256 + nume2;
				value = value * 256 + nume1;

				return value;
			},

			/**
			 * Convert an ArrayBuffer to base64. My testing shows this to be
			 * much faster than combining Blobs and btoa().
			 * ALL CREDITS: https://gist.github.com/jonleighton/958841
			 * NO licensing listed at the gist repo.
			 * @param arrayBuffer
			 * @returns {string}
			 * @private
			 */
			_base64ArrayBuffer :function  (arrayBuffer) {
				var base64    = "";
				var encodings = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

				var bytes         = new Uint8Array(arrayBuffer);
				var byteLength    = bytes.byteLength;
				var byteRemainder = byteLength % 3;
				var mainLength    = byteLength - byteRemainder;

				var a, b, c, d;
				var chunk;

				/*jslint bitwise: true */

				// Main loop deals with bytes in chunks of 3
				for (var i = 0; i < mainLength; i = i + 3) {
					// Combine the three bytes into a single integer
					chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

					// Use bitmasks to extract 6-bit segments from the triplet
					a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
					b = (chunk & 258048)   >> 12; // 258048   = (2^6 - 1) << 12
					c = (chunk & 4032)     >>  6; // 4032     = (2^6 - 1) << 6
					d = chunk & 63;               // 63       = 2^6 - 1

					// Convert the raw binary segments to the appropriate ASCII encoding
					base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
				}

				// Deal with the remaining bytes and padding
				if (byteRemainder == 1) {
					chunk = bytes[mainLength];

					a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

					// Set the 4 least significant bits to zero
					b = (chunk & 3)   << 4; // 3   = 2^2 - 1

					base64 += encodings[a] + encodings[b] + "==";
				} else if (byteRemainder == 2) {
					chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

					a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
					b = (chunk & 1008)  >>  4; // 1008  = (2^6 - 1) << 4

					// Set the 2 least significant bits to zero
					c = (chunk & 15)    <<  2; // 15    = 2^4 - 1

					base64 += encodings[a] + encodings[b] + encodings[c] + "=";
				}

				/*jslint bitwise: false */

				return base64;
			},

			/**
			 * Given a ArrayBuffer and a position it will return a Base64 tile image
			 * @param arrayBuffer
			 * @param position
			 * @returns {string}
			 * @private
			 */

			_buffer2Base64 : function (/* ArrayBuffer */arrayBuffer,/* int */ position){
				var view = new DataView(arrayBuffer,position);
				var chunk = view.getInt32(0,true);
				var buffer = view.buffer.slice(position + 4,position + 4 + chunk);
				return this._base64ArrayBuffer(buffer);
			},

			/**
			 * Converts an integer to hex
			 * @param value
			 * @returns {string}
			 * @private
			 */

			_int2HexString : function (/* int */ value){
				var text = value.toString(16).toUpperCase();
				if (text.length === 1)
				{
					return "000" + text;
				}
				if (text.length === 2)
				{
					return "00" + text;
				}
				if (text.length === 3)
				{
					return "0" + text;
				}
				return text.substr(0, text.length);
			},

			/**
			 * Determines where to start reading a BUNDLEX binary file
			 * @param level
			 * @param row
			 * @param col
			 * @param startRow
			 * @param startCol
			 * @returns {number}
			 * @private
			 */

			_getOffset : function (/* int */level, /* number */row,/* number */col, /* number */startRow, /* number */ startCol){
				var recordNumber = 128 * (col - startCol) + (row - startRow);
				return 16 + recordNumber * 5;
			},

			/**
			 * Returns a hexadecimal representation of a cache file path
			 * @param layerDir
			 * @param level
			 * @param row
			 * @param col
			 * @returns {string}
			 * @private
			 */

			_getCacheFilePath : function  (/* String */ layerDir, /* int */level, /* int */row, /* int */ col){
				var arr = [];

				arr.push(layerDir);
				arr.push("/");
				arr.push("L");
				arr.push(level < 10 ? "0" + level : level);
				arr.push("/");
				arr.push("R");
				arr.push(this._int2HexString(row));
				arr.push("C");
				arr.push(this._int2HexString(col));

				return arr.join("");
			},

			/**
			 * Returns database size in MBs.
			 * @returns {string}
			 * @private
			 */

			_bytes2MBs : function (bytes){
				return (bytes >>> 20 ) + '.' + ( bytes & (2*0x3FF ) ); // jshint ignore:line
			}
			
			
			
      };
});
