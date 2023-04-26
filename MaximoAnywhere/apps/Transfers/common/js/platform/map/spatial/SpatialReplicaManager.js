/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2019,2020
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
/*
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of the Mapstraction nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

;

/**
 * This file is responsible to manage the offline data for the dynamic layers (.geodatabase)
 */


require( [
           "dojo/_base/declare", "dojo/parser", "dojo/ready",
           "dojo/Deferred",
           "dojo/_base/lang",
           "dojo/promise/all",
           "dojo/dom-construct",
           "dojo/dom-class",
           "dojo/on",
           "dojo/request/xhr",
           "platform/logging/Logger",
           "platform/plugins/PermissionsPlugin",
           "platform/translation/MessageService",
           "platform/map/spatial/store/MaximoSpatialStore",
           "platform/util/PlatformConstants",
           "platform/store/SystemProperties",
           "platform/map/MapProperties",
           "platform/store/_ResourceMetadataContext",
           "platform/model/ModelService",
           "platform/map/spatial/SpatialTilePackageManager",
         ], function(declare, parser, ready, Deferred, lang, all, domConstruct, domClass, on, xhr,
        		 Logger, PermissionsPlugin, MessageService, MaximoSpatialStore, PlatformConstants,
        		 SystemProperties, MapProperties, ResourceMetaData, ModelService, SpatialTilePackageManager){

	declare( "platform.map.spatial.SpatialReplicaManager", null, {

	 		configFile: "",
			replicasFiles: {},
			replicaFolderName: "plussReplicas",
			offlineDataDirectory: null,
			featuresSetSize: null,
			numberOfFeaturesAllowed: null,
			totalFeaturesAdded: 0,
			geoJson: null,
			layers: null,
			showWarningMsg: null,
			cancelCurrentSearch: null,
			//Z index must start at 1, because 0 is reserved for the basemap (TPK)
			zIndexShift: 1,
			maxZIndexAdded: 0,
			syncQueriesLimit: 450,
			// 50mb - block size to download the replica from Map Manager
			replicaBlockSize: 0, 
			mapConfigFileName: "mapconfig.json",
			
			constructor : function ( offlineDataDirectory ) {
				this.offlineDataDirectory = offlineDataDirectory;
				this.geoJson = new ol.format.GeoJSON();
				this.layers = {};
				this.featuresSetSize = Number(SystemProperties.getProperty(PlatformConstants.OFFLINE_PAGE_SIZE));
				this.replicaBlockSize = Number(SystemProperties.getProperty(PlatformConstants.OFFLINE_BYTES_LIMIT));
				// Transform to byte
				this.replicaBlockSize = this.replicaBlockSize * 1024 * 1024;
				this.numberOfFeaturesAllowed = Number(SystemProperties.getProperty(PlatformConstants.OFFLINE_FEATURES_LIMIT));
			},
			
			/**
			 * Return the config for a particular offline area, basically it returns the content of the file mapconfig.json, stored
			 * in the file system
			 */
			getOfflineMapConfig: function(offlineAreaId) {
				var config = null;
				if (this.replicasFiles[offlineAreaId]) {
					config = this.replicasFiles[offlineAreaId].config;
				}
				return config;
			},
			
			/**
			 * Load the configuration for each offlinearea, it will load the file mapconfig.json to memory.
			 */
			loadConfigOfflineAreasAvailable: function() {
				var deferred = new Deferred();
				var allAreasPromise = this.getOfflineAreasAvailable();
				allAreasPromise.then(lang.hitch(this, function(offlineAreas){
					var promises = [];
					offlineAreas.forEach(lang.hitch(this, function(offlineAreaId) {
						var loadOfflineAreaConfigDataPromise = this.loadOfflineAreaConfigData(offlineAreaId);
						promises.push(loadOfflineAreaConfigDataPromise);
					}));
					
					all(promises).then(function(){
						deferred.resolve(offlineAreas);
					}).otherwise(function(error){
						 deferred.reject(error);
					});
					
				})).otherwise(function(error){
					 deferred.reject(error);
				});
				return deferred.promise;
			},
			
			/**
			 * Delete the offline data, all the files under the folder <offlineId> will be deleted.
			 */
			deleteOfflineData: function(offlineAreaId) {
				var deferred = new Deferred();
				var promise = this._closeFilesForReplica( offlineAreaId );
				promise.then(lang.hitch(this, function(result) {
					Logger.trace( "Databases closed " );
					console.log("Databases closed ");
					var directory_path = this._getOfflineStorage() + "/" + this.replicaFolderName ;
					window.resolveLocalFileSystemURL(directory_path, function(dir) {
						Logger.trace("Got replicas dir", dir);
						dir.getDirectory(""+offlineAreaId, {}, function(offlineReplicaDir) {
							Logger.trace("Deleting replica dir", offlineReplicaDir);
							offlineReplicaDir.removeRecursively(function() {
								deferred.resolve();
							}, function(error) {
								Logger.trace("Failed to delete fir " + offlineReplicaDir +" offlineAreaId: ", offlineAreaId);
							});		
						});
					}, function(error) {
						deferred.reject(error); 
					});
				})).otherwise(lang.hitch(this, function(resultJson){
					console.error(resultJson);
					deferred.reject(resultJson); 
			}));
				return deferred.promise;
			},
			
			_getOfflineStorage: function(path) {
				var pathParam = null;
				if (path == null) {
					pathParam = this.offlineDataDirectory;
				} else {
					pathParam = path;
				}
				return SpatialTilePackageManager._getOfflineStorage(pathParam);
		    },
			
			/**
			 * Return the offline areas available, it will search for all the folders under plussReplicas
			 */
			getOfflineAreasAvailable: function() {
				var deferred = new Deferred();
				var offlineAreasAvailable = [];
				var directory_path = this._getOfflineStorage() + "/" + this.replicaFolderName + "/";
				window.resolveLocalFileSystemURL(directory_path , function(dirEntry) {
					var directoryReader = dirEntry.createReader();
                    
                    // Get a list of all the entries in the directory
                    directoryReader.readEntries(lang.hitch(this, function(entries) {
                    	 for (i=0; i<entries.length; i++) {
                         	if( entries[i].isDirectory) {
                         		var dirName = entries[i].name;
                         		offlineAreasAvailable.push(dirName);
                         	}   
                         }
                    	 deferred.resolve(offlineAreasAvailable);
                    }), lang.hitch(this, function(error) {
                        Logger.log("Failed to list " + this.replicaFolderName +" directory contents: ", error);
                        deferred.resolve(offlineAreasAvailable);
                     }));
				}, function(error) {
					deferred.resolve(offlineAreasAvailable);
		    	})
				return deferred.promise;
			},
			
			/**
			 * This variable contains all the json information loaded to memory.
			 */
			getReplicasConfig: function() {
				return this.replicasFiles;
			},
			
			/**
			 * Close the database when switching to online map.
			 */
			_closeFilesForReplica: function(offlineAreaUID) {
				var deferred = new Deferred();
				var self = this;
				
				
				var dbsInfos = this.replicasFiles[offlineAreaUID].dbs;
				if (dbsInfos != null) {
					dbsInfos.forEach(lang.hitch(this, function(dbInfo) {
						var filePath = dbInfo.dbFile;
						cordova.exec(
    							// success - db opened
    							function(object) {
    								Logger.trace("[SQLitePlugin] Database closed ");
    								deferred.resolve();
    							}, 
    							// failed
    							function(errorMsg) {
    								Logger.log(errorMsg);
    								Logger.log("[SQLitePlugin] failed to resolve, error message: " + errorMsg);
    								deferred.reject(errorMsg);
    							}, 
    							'SQLitePlugin', 
    							 'close', 
    		    				 [{'path': filePath}]
    						);
						
					}))
					this.replicasFiles[offlineAreaUID] = null;
				}
				
				
				return deferred.promise;
			},
			
			/**
			 * Load all the files for a particular offline area id.
			 */
			_loadFilesForReplica: function(offlineAreaUID) {
				var deferred = new Deferred();
				var self = this;
				var files = [];
				var directory_path = this._getOfflineStorage() + "/" + this.replicaFolderName + "/" + offlineAreaUID + "/";
				window.resolveLocalFileSystemURL(directory_path , function(dirEntry) {
			    		var directoryReader = dirEntry.createReader();
                        
	                    // Get a list of all the entries in the directory
                        directoryReader.readEntries(function(entries) {
                        	var i;
                        	var countFilesToLoad = 0;
                            for (i=0; i<entries.length; i++) {
                            	if( entries[i].isFile) {
                            		var fileName = entries[i].name;
                            		if (fileName.indexOf('journal') == -1 && fileName.indexOf('.json') == -1 
                            				&& fileName.indexOf('-wal') == -1 && fileName.indexOf('-shm') == -1) {
                            			countFilesToLoad++;
                            		}
                            	}   
                            }
                            
                            if (countFilesToLoad > 0) {
                            	for(i=0; i<entries.length; i++) {
                                	if( entries[i].isFile) {
                                    	var file = self._getOfflineStorage(entries[i].fullPath);
                                    	var fileName = entries[i].name;
                                    	
                                    	
                                    	if (fileName.indexOf('journal') == -1 && fileName.indexOf('.json') == -1 
                                    			&& fileName.indexOf('-wal') == -1 && fileName.indexOf('-shm') == -1) {
                                    		Logger.trace('File found ' + file);
                                    		files.push({'filePath': file, 'fileName': fileName});
                                        	
                                    		self.replicasFiles[offlineAreaUID] = {}
                                        	self.replicasFiles[offlineAreaUID].dbs = []
                                        	
                                        	cordova.exec(
                        							// success - db opened
                        							function(object) { 
                        								countFilesToLoad--;
                        								if (countFilesToLoad <= 0) {
                        									var filesToRead = files.length;
                        									files.forEach(lang.hitch(this, function(file) {
                        										var filePath = file.filePath;
                        										var fileName = file.fileName;
                        										var sqlLoadMetadaData = "select '" + filePath + "' as filePath, '"+ fileName + "' as fileName, s.ItemId as layer_id," +
                        										"t.table_name, t.rowid_column, l.spatial_column, l.srid, s.iteminfo, g.geometry_type, g.f_geometry_column as originalGeometryColumn " +
                                                    			"from GDB_TableRegistry t, GDB_Layers l, GDB_ServiceItems s, st_geometry_columns g " +
                                                    			"where t.table_name=l.table_name and t.table_name=s.DatasetName and t.table_name=g.f_table_name and t.table_name not like 'GDB_%' order by s.ItemId";
                        										cordova.exec(
                                            							// success - db read
                                            							function(object) { 
                                            								filesToRead--;
                                            								
                                            								if (object.length > 0) {
                                            									var object0 = object[0];
                                            									if (object0.type == "error") {
                                            										Logger.log("[SQLitePlugin]Error ");
                                                    								deferred.reject();
                                            									} 
                                            									
                                            									var rows = object0.result.rows;
                                            									if (rows.length > 0) {
                                            										
                                            										var mapServiceId = rows[0].fileName;
                                            										var lastIndexPoint = mapServiceId.lastIndexOf(".");
                                            										mapServiceId = mapServiceId.substring(0, lastIndexPoint);
                                            										
                                            										var databaseObject = {
                                                											"dbFile": rows[0].filePath,
                                                											"mapServiceId": mapServiceId,
                                                											"tables": []
                                                									};
                                            										rows.forEach(lang.hitch(this, function(row) {
                                            											var tableObject = {
                                                												'layerId': row.layer_id,
                                                												'tableName' : row.table_name,
                                                												'objectIdColumn' : row.rowid_column,
                                                												'shapeColumn' : 'mxshape',
                                                												'originalShapeColumn' : row.originalGeometryColumn,
                                                												'spatialReference': row.srid,
                                                												'itemInfo': row.iteminfo,
                                                												'geometryType': row.geometry_type
                                                										};
                                            											databaseObject.tables.push(tableObject);
                                            										}));
                                            										self.replicasFiles[offlineAreaUID].dbs.push(databaseObject);
                                            									}
                                            								}
                                            								
                                            								if (filesToRead <= 0) {
                                            									var loadMetaDataMapServer = self.loadMapServerMetaData(offlineAreaUID);
                                                								loadMetaDataMapServer.then(function() {
                                                										var loadMetaDataMapServer = self.loadOfflineAreaConfigData(offlineAreaUID);
                                                        								loadMetaDataMapServer.then(function() {
                                                        									deferred.resolve();
                                                            							}).otherwise(function(errorMsg) {
                                                        									Logger.log("[SQLitePlugin] failed to resolve, error message: " + errorMsg);
                                                        									deferred.resolve();
                                                        								});
                                                										
                                                    							}).otherwise(function(errorMsg) {
                                                										Logger.log("[SQLitePlugin] failed to resolve, error message: " + errorMsg);
                                                										deferred.resolve();
                                                								});
                                            								}
                                            								
                                            								
                                            								
                                            								
                                            							}, 
                                            							// failed
                                            							function(errorMsg) {
                                            								Logger.log(errorMsg);
                                            								Logger.log("[SQLitePlugin] failed to resolve, error message: " + errorMsg);
                                            								deferred.reject(errorMsg);
                                            							}, 
                                            							'SQLitePlugin', 
                                            							 'executeSqlBatch', 
                                            		    				 [{
                                            		    					'dbargs': {
                                            		    					 		'dbname':filePath
                                            		    				 	},
                                            		    				 	'executes': [
                                            		    						{'sql':sqlLoadMetadaData, 'qid':'1', 'params': []}
                                            		    					]
                                            		    				 		
                                            		    				 }]
                                            						);
                        									}));
                       									 
                        								}
                        								
                        							}, 
                        							// failed
                        							function(errorMsg) {
                        								Logger.log(errorMsg);
                        								Logger.log("[SQLitePlugin] failed to resolve, error message: " + errorMsg);
                        								deferred.reject(errorMsg);
                        							}, 
                        							'SQLitePlugin', 
                        							 'open', 
                        		    				 [{'name': file}]
                        						);
                                    	}
                                    } 
                                }
                            } else {
                            	deferred.resolve();
                            }
                         },function(error) {
                             Logger.log("Failed to list _replicas directory contents: ", error);
                             deferred.reject(error);
                          });
                }, function(error) {
			    		deferred.reject(); 
			    });
				
				return deferred.promise;
			},
			
			/**
			 * Load the mapconfig.json to memory, this file contains information for a particular offline area,
			 * such as last date sync, map services orders, visibility, and so on
			 */
			loadOfflineAreaConfigData: function(offlineAreaId) {
				var deferred = new Deferred();
				var self = this;
				var directory_path = this._getOfflineStorage() + "/" + this.replicaFolderName + "/" + offlineAreaId + "/";
				var metadataToLoad = directory_path + this.mapConfigFileName;
				
				window.resolveLocalFileSystemURL(metadataToLoad, function (fileEntry) {
			        Logger.trace("Found file " + metadataToLoad);
			        fileEntry.file(function (file) {
			        	var reader = new FileReader();

			            reader.onloadend = function (event) {
			            	 
			                var jsonInfo = JSON.parse(event.target._result);
			                
			                if (self.replicasFiles[offlineAreaId] == null) {
			                	self.replicasFiles[offlineAreaId] = {};
			                }
			                
			                self.replicasFiles[offlineAreaId].config = jsonInfo;
			                
			               var mapServices = jsonInfo.mapServicesConfig;
			               if (mapServices) {
			            	   var maxOrder = 0;
			            	   mapServices.forEach(lang.hitch(this, function(mapService) {
			            		   var order = mapService.order;
			            		   if (order > maxOrder) {
			            			   maxOrder = order;
			            		   }
			            	   }));
			            	   self.replicasFiles[offlineAreaId].config.maxOrder = maxOrder;
			               }
			               deferred.resolve();
			            };

			            reader.onerror = function (event) {
			            	console.error("File could not be read! Code " + event.target.error.message);
			                deferred.reject(event.target.error);
			            };

			            reader.readAsText(file);

			        }, function (err) {
			        	Logger.log("Error in getting file " + err);
			            deferred.reject(err);
			        });
			    }, function (err) {
			    	Logger.log("Error in getting file entry " + err);
			        deferred.reject(err);
			    });
				
				
				return deferred.promise;
			},
			
			/**
			 * Load the <layerId>.json to memory, this file contains information for a particular layer inside the map service,
			 * it contains the json representation of the layer, example: http://.../FeatureServer/<layerId>?f=json
			 */
			loadMapServerMetaData: function(offlineAreaId) {
				var deferred = new Deferred();
				var self = this;
				var layersObject = {};
				var databaseObjects = this.replicasFiles[offlineAreaId].dbs;
				var metadatasToLoad = [];
				var directory_path = this._getOfflineStorage() + "/" + this.replicaFolderName + "/" + offlineAreaId + "/";
				databaseObjects.forEach(lang.hitch(this, function(databaseObject) {
					var tables = databaseObject.tables;
					var mapServiceId = databaseObject.mapServiceId;
					var mapServerJSON = directory_path + mapServiceId + ".json";
					metadatasToLoad.push(mapServerJSON);
					
					tables.forEach(lang.hitch(this, function(table) {
						var fileName = directory_path + mapServiceId + "-" + table.layerId + ".json";
						metadatasToLoad.push(fileName);
					}));
				}));
				if (metadatasToLoad.length > 0) {
					var filesToRead = metadatasToLoad.length;
					metadatasToLoad.forEach(lang.hitch(this, function(metadataToLoad) {
						window.resolveLocalFileSystemURL(metadataToLoad, function (fileEntry) {
					        Logger.trace("Found file " + metadataToLoad);
					        fileEntry.file(function (file) {
					        	var reader = new FileReader();

					            reader.onloadend = function (event) {
					            	filesToRead--;
					                
					                var localURL = event.target._localURL;
					                var jsonInfo = JSON.parse(event.target._result);
					                
					                var indexSlash = localURL.lastIndexOf("/");
					                var fileName = localURL.substring(indexSlash+1);
					                fileName = fileName.replace(/.json/ig, '');
					                
					                var currentMapServiceId = fileName;
					                var currentLayerId = null;
					                var splitChar = fileName.indexOf("-");
					                //It means the json file is for a particular layer
					                if (splitChar > -1) {
					                	currentLayerId = fileName.substring(splitChar+1);
					                	currentMapServiceId = fileName.substring(0, splitChar);
					                }
					                var databaseObjects = self.replicasFiles[offlineAreaId].dbs;
					                databaseObjects.forEach(lang.hitch(this, function(databaseObject) {
					                	if (databaseObject.mapServiceId == currentMapServiceId) {
					                		
					                		if (currentLayerId == null) {
					                			databaseObject.jsonLayer = jsonInfo;
					                		} else {
					                			var tables = databaseObject.tables;
					        					tables.forEach(lang.hitch(this, function(table) {
					        						if (table.layerId == currentLayerId) {
					        							var extraFields = [];
					        							var drawingInfo = jsonInfo.drawingInfo;
					        						    if (drawingInfo) {
					        						    	var renderer = drawingInfo.renderer;
					        						    	if (renderer) {
					        						    		var field1 = renderer.field1;
					        						    		var field2 = renderer.field2;
					        						    		var field3 = renderer.field3;
					        						    		
					        						    		if (field1 != null && field1!='null') {
					        						    			extraFields.push(field1);
					        						    		}
					        						    		if (field2 != null && field2!='null') {
					        						    			extraFields.push(field2);
					        						    		}
					        						    		if (field3 != null && field3!='null') {
					        						    			extraFields.push(field3);
					        						    		}
					        						    	}
					        						    }
					        						    
					        							table.jsonLayer = jsonInfo;
					        							table.extraFields = extraFields;
					        						}
					        					}));
					                		}
					                	}
					                }));
					                
					                
					                if (filesToRead <= 0) {
					                	deferred.resolve();
					                }
					            };

					            reader.onerror = function (event) {
					            	filesToRead--;
					                console.error("File could not be read! Code " + event.target.error.message);
					                deferred.reject(event.target.error);
					            };

					            reader.readAsText(file);

					        }, function (err) {
					        	filesToRead--;
					            Logger.log("Error in getting file " + err);
					            deferred.reject(err);
					        });
					    }, function (err) {
					    	filesToRead--;
					        Logger.log("Error in getting file entry " + err);
					        deferred.reject(err);
					    });
					}));
				} else {
					deferred.resolve();
				} 
					
				
				
				return deferred.promise;
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
			
			
			/**
			 * Initial config for offline map, it creates the warning div to show when the loading limit is reached
			 */
			initializeOfflineMap: function() {
				this.totalFeaturesAdded = [];
				this.layers = {};
				
				var currentViewId = WL.application.ui.getCurrentView().id;
				var limitFeaturesDiv = domConstruct.create('div');
				limitFeaturesDiv.setAttribute("id","spatial-offline-map-features-warning"+currentViewId);
				limitFeaturesDiv.setAttribute("class","spatial-offline-map-features-warning");
				
				var divWarningBtn = document.createElement('div');
				divWarningBtn.setAttribute("id","divWarningIcon"+currentViewId);
				divWarningBtn.setAttribute("class","spatial-offline-map-features-warning-btn");
				domConstruct.place(divWarningBtn, limitFeaturesDiv, "first");
				
				on(limitFeaturesDiv, 'click',lang.hitch(this, function() {
					this.showWarningTotalFeatures();
				}));
				
				var mapDiv = dojo.byId(currentViewId);
				domConstruct.place(limitFeaturesDiv, mapDiv, "last");
				
			},
			
			/**
			 * Destroy all the offline related information when the user switches to online map
			 */
			_closeMetadataForAllReplicasAvaiable: function() {
				var deferred = new Deferred();
				var currentViewId = WL.application.ui.getCurrentView().id;
				domConstruct.destroy("spatial-offline-map-features-warning"+currentViewId);
				
				var checkPermissionPromise = this.checkPermission();
				checkPermissionPromise.then(lang.hitch(this, function(){
					var promises = [];
					var allAreasPromise = this.getOfflineAreasAvailable();
					allAreasPromise.then(lang.hitch(this, function(offlineAreas){
						offlineAreas.forEach(lang.hitch(this, function(offlineAreaId) {
							var closeMetaDataOfflineAreaPromise = this.closeReplicas(offlineAreaId);
							promises.push(closeMetaDataOfflineAreaPromise);
						}));
						
						all(promises).then(function(){
							deferred.resolve();
						}).otherwise(function(error){
							 deferred.reject(error);
						});
						
					})).otherwise(function(error){
						 deferred.reject(error);
					});
				})).otherwise(lang.hitch(this, function(error){
					 deferred.reject(error);
				}));
				return deferred.promise;
			},
			
			/**
			 * Check if there is offline data available.
			 */
			_hasOfflineDataAvaiable: function() {
				var deferred = new Deferred();
				var checkPermissionPromise = this.checkPermission();
				checkPermissionPromise.then(lang.hitch(this, function(){
					var promises = [];
					var allAreasPromise = this.getOfflineAreasAvailable();
					allAreasPromise.then(lang.hitch(this, function(offlineAreas){
						var countAreasToCheck = offlineAreas.length;
						offlineAreas.forEach(lang.hitch(this, function(offlineAreaId) {
							var loadMetaDataOfflineAreaPromise = this.checkConfigurationForOfflineArea(offlineAreaId);
							loadMetaDataOfflineAreaPromise.then(lang.hitch(this, function(offlineAreas){
								countAreasToCheck--;
								if (countAreasToCheck <= 0) {
									deferred.resolve();
								}
							})).otherwise(lang.hitch(this, function(offlineAreas){
								countAreasToCheck--;
								if (countAreasToCheck <= 0) {
									deferred.reject();
								}
							}));
						}));
						if (countAreasToCheck == 0) {
							deferred.reject();
						}
						
					})).otherwise(function(error){
						 deferred.reject(error);
					});
				})).otherwise(lang.hitch(this, function(error){
					 deferred.reject(error);
				}));
				return deferred.promise;
			},
			
			/**
			 * Load the metadata for all the offline areas available under plussReplicas folder
			 */
			_loadMetadataForAllReplicasAvaiable: function() {
				var deferred = new Deferred();
				var checkPermissionPromise = this.checkPermission();
				checkPermissionPromise.then(lang.hitch(this, function(){
					var promises = [];
					var allAreasPromise = this.getOfflineAreasAvailable();
					allAreasPromise.then(lang.hitch(this, function(offlineAreas){
						offlineAreas.forEach(lang.hitch(this, function(offlineAreaId) {
							var loadMetaDataOfflineAreaPromise = this.loadReplicas(offlineAreaId);
							promises.push(loadMetaDataOfflineAreaPromise);
						}));
						
						all(promises).then(function(){
							deferred.resolve();
						}).otherwise(function(error){
							 deferred.reject(error);
						});
						
					})).otherwise(function(error){
						 deferred.reject(error);
					});
				})).otherwise(lang.hitch(this, function(error){
					 deferred.reject(error);
				}));
				return deferred.promise;
			},
				
			/**
			 * Close the replicas, the online map will be displayed.
			 */
			closeReplicas: function(offlineAreaUID) {
				var deferred = new Deferred();
				var self = this;
				if (self.replicasFiles == null) {
					self.replicasFiles = {};
				}
				if ( self.replicasFiles[offlineAreaUID] != null) {
					var checkPermissionPromise = this.checkPermission();
					checkPermissionPromise.then(function(){
						var promiseCloseFiles = self._closeFilesForReplica(offlineAreaUID);
						promiseCloseFiles.then(function(entries) {
							deferred.resolve();
						}).otherwise(function(error) {
							Logger.log("Failed to close replicas: ", error);
	                        deferred.reject(error);
						});
					}).otherwise(function(error){
						 deferred.reject(error);
					});
				} else {
					deferred.resolve();
				}
				
				return deferred.promise;
			},

			/*
			 * Load all the replica files for a particular offline area.
			 */
			loadReplicas: function(offlineAreaUID) {
				var deferred = new Deferred();
				var self = this;
				if (self.replicasFiles == null) {
					self.replicasFiles = {};
				}
					
				var checkPermissionPromise = this.checkPermission();
				checkPermissionPromise.then(function(){
					var promiseLoadFiles = self._loadFilesForReplica(offlineAreaUID);
					promiseLoadFiles.then(function(entries) {
						deferred.resolve();
					}).otherwise(function(error) {
						Logger.log("Failed to load replicas: ", error);
	                    deferred.reject(error);
					});
				}).otherwise(function(error){
					 deferred.reject(error);
				});
				
				return deferred.promise;
			},
			
			/**
			 * Show or hide the warning div (features limit)
			 */
			_changeWarningDivVisibility: function(show) {
				var currentViewId = WL.application.ui.getCurrentView().id;
				var divWarning = dojo.byId("spatial-offline-map-features-warning"+currentViewId);					
				if (divWarning!= null) {
					if (show && !domClass.contains(divWarning, "showPanel")) {
						domClass.add(divWarning, "showPanel");
					} else {
						if (!show && domClass.contains(divWarning, "showPanel")) {
							domClass.remove(divWarning, "showPanel");
						}
					} 
		        }

			},
			
			/**
			 * Show or hide the warning div (features limit) and shows the toast message
			 */
			showWarningTotalFeatures: function() {
				Logger.trace("Max number os features per map extent reached [" +this.numberOfFeaturesAllowed+ "], not more features allowed");
				var msg = MessageService.createResolvedMessage('limitFeaturesReached', [this.numberOfFeaturesAllowed]);
				WL.application.ui.showToastMessage(msg);
				this._changeWarningDivVisibility(true);
			},
			
			/**
			 * Load features for a layer considering the extent
			 */
			loadFeatures: function (index, tableParams, xmin, xmax, ymin, ymax, mobileMaximoSpatial) {
				var deferred = new Deferred();
				this._queryFeatures(index, tableParams, xmin, xmax, ymin, ymax, mobileMaximoSpatial, deferred);
				return deferred.promise;
			},
			
			/**
			 * Executes the query on the database to bring all features on the extent
			 */
			_queryFeatures: function (index, tableParams, xmin, xmax, ymin, ymax, mobileMaximoSpatial, deferred) {
				if (this.cancelCurrentSearch == true) {
					deferred.resolve();
					return;
				}
				var map = mobileMaximoSpatial.map;
				var geomColumn= tableParams.geomColumn;
				var originalGeomColumn= tableParams.originalGeomColumn;
				var idColumn= tableParams.idColumn;
				var layerId= tableParams.layerId;
				var tableName= tableParams.tableName;
				var mapServiceId= tableParams.mapServiceId;
				var filePath= tableParams.filePath;
				var mapSpatialReference= tableParams.mapSpatialReference;
				var layerSpatialReference= tableParams.layerSpatialReference;
				var geometryType = tableParams.geometryType;
				
				var extraFields = tableParams.extraFields;
				var strExtraFields = "";
				if (extraFields) {
					extraFields.forEach(function(extraField) {
						strExtraFields += "," +  extraField;
					});
				}
				
				if (this.totalFeaturesAdded >= this.numberOfFeaturesAllowed) {
					if (this.showWarningMsg) {
						this.showWarningTotalFeatures();
						this.showWarningMsg = false;
					}
					deferred.resolve();
				} else {
					var query = null;
					var commonQuery = "SELECT " + geomColumn + " as geometry, " + idColumn + " as idColumn ,'"+layerId+"' as layerId,'"+mapServiceId+"' as mapServiceId, '"+
						filePath +"' as filePath, '" + tableName + "' as tableName, '"+ idColumn +"' as idColumnName " 
						+ strExtraFields + " FROM " + tableName + ", st_spindex__" + tableName + "_shape WHERE pkid=gdb_archive_oid and ";
					//Point - For point we just need to verify all the geometries inside the map extent
					if (geometryType == 1) {
						var containsPoint = "minx >= " + xmin + " AND maxx <= " + xmax + " AND miny >= " + ymin + " AND maxy <= " + ymax;
						query =  commonQuery + containsPoint;
					} else {
						// For line or polygon we need to verify if the bbox overlaps the map extent
						var overlapsMath = "minx < " + xmax + " and maxx > " + xmin + " and miny < " + ymax + " and maxy > " + ymin;
						query = commonQuery + overlapsMath;
					}
					
					query = query + " limit " + this.featuresSetSize + " offset " + index;
										
					var self = this;
					cordova.exec(
							// success - db read
							function(object) { 
								if (object.length > 0) {
									
									var object0 = object[0];
									if (object0.type == "error") {
										Logger.log("[SQLitePlugin]Error "+ JSON.stringify(object0));
										console.log("Error " + JSON.stringify(object0))
        								deferred.reject();
									} else {
										var rows = object[0].result.rows;
										var rowsLength = rows.length;
										
								        if (self.totalFeaturesAdded < self.numberOfFeaturesAllowed && !self.cancelCurrentSearch) {
								        	self.totalFeaturesAdded += rowsLength;
									        Logger.trace('Loading ' + rowsLength);
											if (rows.length > 0) {
												var tableName = rows[0].tableName;
												var mapServiceId = rows[0].mapServiceId;
												var layerId = rows[0].layerId;
												Logger.trace('Table name ' + tableName + ' :  layerId' + layerId);
												var currentLayer = self.layers[mapServiceId+'-'+layerId];
												var featuresToAdd = [];
												rows.forEach(lang.hitch(this, function(row) {
													try {
														var attributes = {
																'objectid': row.idColumn
														}
														var geometry = JSON.parse(row.geometry);
												        var newFeature = {
												            'type': 'Feature',
												            'geometry': geometry
												        };
												        
												        var olFeature = self.geoJson.readFeature(newFeature,{
												            dataProjection: 'EPSG:'+layerSpatialReference,
												            featureProjection: 'EPSG:'+mapSpatialReference
												        });
												        var count=0;
												        for (var attrName in row) {
												        	count++;
												        	//Fixed attributes returned, if there are more they are attributes for symbology
												        	if(count >5) {
												        		attributes[attrName] = row[attrName];
												        	}
												        }
												        olFeature.attributesFieldsName = attributes;
												        olFeature.isFromLocalSQLite = true;
												        olFeature.dbInfo = {
												        		'layerId': layerId,
												        		'mapServiceId': mapServiceId,
												        		'oid': row.idColumn,
												        		'tableName': row.tableName,
												        		'idColumnName': row.idColumnName,
												        		'filePath': row.filePath,
												        		'geomColumn': geomColumn,
												        		'originalGeomColumn': originalGeomColumn
												        }
												       
												        var jsonSymbol = currentLayer.jsonmapserver;
												        if (jsonSymbol) {
												        	var style = mobileMaximoSpatial._getStyleByFeature( olFeature, jsonSymbol.drawingInfo );
												        	if (style) {
												        		olFeature.setStyle(style);
															}
												        } else {
												    		Logger.trace("[SpatialReplicaManager] Layers json does not exist for layerId: " + layerId + ", check TPK folder for the file: " + mapServiceId + "-" + layerId + ".json");
													    }
												        
												        featuresToAdd.push(olFeature);
													} catch(err) { 
														Logger.trace("Error - Loading features " + err);
													}
													
											    }));
												
												if (featuresToAdd.length > 0) {
													 var sourceLayer = currentLayer.getSource();
												     sourceLayer.addFeatures(featuresToAdd);
												}
												index = index + self.featuresSetSize;
												self._queryFeatures(index, tableParams, xmin, xmax, ymin, ymax, mobileMaximoSpatial, deferred);
											} else {
												deferred.resolve();
											}
								        } else {
								        	deferred.resolve();
								        }
									}
									
									
							        
								} else {
									deferred.resolve();
								}
							}, 
							// failed
							function(errorMsg) {
								Logger.log("[SQLitePlugin] failed to resolve, error message: " + errorMsg);
								deferred.resolve();
							}, 
							'SQLitePlugin', 
							 'executeSqlBatch', 
		    				 [{
		    					'dbargs': {
		    					 		'dbname':filePath
		    				 	},
		    				 	'executes': [
		    						{'sql':query, 'qid':'1', 'params': []}
		    					]
		    				 		
		    				 }]
						);
				}
			},
			
			/**
			 * Method used by identify tool
			 */
			findFeature: function(oid, tableName, filePath, idColumnName, layerId) {
				var deferred = new Deferred();
				var queries = [];
				var query = "SELECT '" + tableName +"' as layerName, '" + layerId+ "' as layerId, * from " + tableName + " where " + idColumnName + "=" + oid;
				queries.push(query);
				
				var queryRegistry = "SELECT * from GDB_ColumnRegistry where table_name='" + tableName + "'";
				queries.push(queryRegistry);
				
				var promiseQueries = this._execQueries(queries, filePath);
				promiseQueries.then(lang.hitch(this, function(object) {
					if (object.length > 0) {
						var rows = object[0].result.rows;
						Logger.trace("[IdentifyTool] Feature find: " + rows.length);
						if (rows.length > 0) {
							attributes = rows[0];
							columns = object[1].result.rows;
							columns.forEach(lang.hitch(this, function(column) {
								var columnName = column.column_name;
								
								if (columnName.toLowerCase().indexOf("gdb_") > -1) {
									delete attributes[columnName];
								} else {
									if (attributes[columnName] == null) {
										attributes[columnName] = "";
									}else if (column.sde_type == 7) {
									   attributes[columnName] =  this.dateJuliantoGregorian(attributes[columnName]);
								    }
									
								}
								
							}));
							feature = {
									'attributes': attributes,
							}
						}
					}
					
					deferred.resolve(feature);
				})).otherwise(function(error) {
					deferred.reject(error);
				});	
				
				return deferred.promise;
			},
			
			dateJuliantoGregorian: function(julianDate) {
				if (julianDate == null){
					return "";
				}
				var X = parseFloat(julianDate) + 0.5;
				var Z = Math.floor(X); //Get day without time
				var F = X - Z; //Get time
				var Y = Math.floor((Z - 1867216.25) / 36524.25);
				var A = Z + 1 + Y - Math.floor(Y / 4);
				var B = A + 1524;
				var C = Math.floor((B - 122.1) / 365.25);
				var D = Math.floor(365.25 * C);
				var G = Math.floor((B - D) / 30.6001);

				//must get number less than or equal to 12)
				var month = (G < 13.5) ? (G - 1) : (G - 13);

				//if Month is January or February, or the rest of year
				var year = (month < 2.5) ? (C - 4715) : (C - 4716);
				month -= 1; //Handle JavaScript month format
				var UT = B - D - Math.floor(30.6001 * G) + F;
				var day = Math.floor(UT);

				//Determine time
				UT -= Math.floor(UT);
				UT *= 24;
				var hour = Math.floor(UT);
				UT -= Math.floor(UT);
				UT *= 60;
				var minute = Math.floor(UT);
				UT -= Math.floor(UT);
				UT *= 60;
				var second = Math.round(UT);

				return this.getDateWithTimeZone(new Date(Date.UTC(year, month, day, hour, minute, second)));
			},
			
			 getDateWithTimeZone: function (date) { 
                 var day  = date.getDate().toString();
                 var dayF = (day.length == 1) ? '0'+day : day;
                 var month  = (date.getMonth()+1).toString();
                 var monthF = (month.length == 1) ? '0'+month : month;
                 var yearF = date.getFullYear();
                 var hour = date.getHours().toString();
                 var hourF = (hour.length == 1) ? '0'+hour: hour;
                 var minutes = date.getMinutes().toString();
                 var minutesF = (minutes.length == 1) ? '0'+minutes: minutes;
                 var seconds = date.getSeconds().toString();
                 var secondsF = (seconds.length == 1) ? '0'+seconds: seconds;

				 return monthF+"/"+dayF+"/"+yearF+" "+hourF+":"+minutesF+":"+secondsF;

			 },
			
			/**
			 * Check if the configuration is ok for an offline area
			 */
			checkConfigurationForOfflineArea: function(offlineAreaId) {
				var deferred = new Deferred();
				
				var loadReplicasPromise = this.loadReplicas(offlineAreaId);
				loadReplicasPromise.then(lang.hitch(this, function() {
					var offlineAreaConfig = this.replicasFiles[offlineAreaId].config;
					if (offlineAreaConfig == null) {
						deferred.reject();
					} else {
						var dbsInfos = this.replicasFiles[offlineAreaId].dbs;
						if (dbsInfos != null) {
							var isOk = true;
							var filesToRead = dbsInfos.length;
							dbsInfos.forEach(lang.hitch(this, function(dbInfo) {
								var filePath = dbInfo.dbFile;
								var mapServiceId = dbInfo.mapServiceId;
								var jsonLayer = dbInfo.jsonLayer;
								if (jsonLayer == null) {
									isOk = false;
								} else {
									var tables = dbInfo.tables;
		        					tables.forEach(lang.hitch(this, function(table) {
		        						var layerId = table.layerId;
		        						var jsonLayer = table.jsonLayer;
		        						if (jsonLayer == null) {
		        							isOk = false;
		        							Logger.trace("[SpatialReplicaManager] Layers json does not exist for layerId: " + layerId + ", check TPK folder for the file: " + mapServiceId + "-" + layerId + ".json");
										}
		        					}));		        					
								}
							}))
							if (isOk) {
								deferred.resolve();
							}else {
								deferred.reject();
							}
						} else {
							
						}
					}
					
				})).otherwise(lang.hitch(this, function() {
					deferred.reject();
				}));
				
				return deferred.promise;
			},
			
			getMobileMaximoSpatialInstance: function() {
				var spatialMapHandler = WL.application["platform.handlers.spatial.SpatialMapHandler"];
				var mobileMaximoSpatial = spatialMapHandler["getMobileMaximoSpatialInstance"]();
				return mobileMaximoSpatial;
			},
			
			/**
			 * Get the Maximo URL from the resource, the address is configurable in build.properties
			 */
			_getMaximoURL : function() {
				var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
				return mobileMaximoSpatial.mapManager.maximoAddress;
			},
			
			/**
			 * Get the Max header to authenticate
			 */
			_getMaxAuthHeader: function() {
				var loginResource = WL.application.getResource('PlatformLoginResource').getCurrentRecord();
				return btoa(loginResource.username + ":" + loginResource.password);
			},
			
			_getGeodatabase: async function(offlineAreaId, mapService, sizeAlreadLoaded, blockNumber, mapServicesLoaded, mapServicesToLoad, deferred) {
				let geodatabase = null;
				var mapServiceId = mapService.id;
				var mapServiceName = mapService.name;
				var sizeMb = mapService.sizeMb;
				var sizeBytes = Number(sizeMb) * 1024 * 1024;
				var numberOfBlocks = Math.ceil(sizeBytes/this.replicaBlockSize);
				var baseUrl = this._getMaximoURL();	
				Logger.trace("_getGeodatabase baseUrl " + baseUrl);
				var requestURL = baseUrl + "/oslc/plussofflinemapservicereplica";
				var requestSecURL = baseUrl + "/j_security_check";
				Logger.trace("_getGeodatabase requestURL " + requestURL);
				
				var params = {
						"offlineAreaId": offlineAreaId,
						"mapServiceId": mapServiceId,
						"maxBytes": this.replicaBlockSize,
						"position": sizeAlreadLoaded
				};
				
				var segurityParams = {
						"j_username": WL.application.getResource('PlatformLoginResource').getCurrentRecord().username,
						"j_password": WL.application.getResource('PlatformLoginResource').getCurrentRecord().password
				};
				
				Logger.trace("_getGeodatabase params " + JSON.stringify(params));
				
				//Do the post request to enable LDAP if necessary
				xhr(requestSecURL, {
					method: "POST",
					data: segurityParams,
					sync: true,
					headers: {
						"Content-type":"application/x-www-form-urlencoded"
					}
					
				}).then(function(checkUseLDAP){
					Logger.trace("_getGeodatabase LDAP enabled. ");
					
				}, function(err){
					  Logger.log("_getGeodatabase LDAP not enabled. ");
				  });
				
				// Do the post request to Maximo to get the geodatabase
				geodatabase = null;

				try {
					geodatabase = await fetch(requestURL, {
						"credentials": "include",
						"headers": {
							"accept": "*/*",
							"accept-language": "en-US,en;q=0.9",
							"content-type": "application/x-www-form-urlencoded",
							"maxauth": this._getMaxAuthHeader(),
							"x-requested-with": "XMLHttpRequest"
						},
						"referrerPolicy": "no-referrer-when-downgrade",
						"body": "offlineAreaId="+offlineAreaId+"&mapServiceId="+mapServiceId+"&maxBytes="+this.replicaBlockSize+"&position="+sizeAlreadLoaded,
						"method": "POST",
						"mode": "cors"
					});

					Logger.trace("_getGeodatabase geodatabase returned from maximo ");
					let resp = await geodatabase.text();
					if (resp == null || resp == "") {
						Logger.trace("_getGeodatabase geodatabase is empty for offline area id: " + offlineAreaId + " and  mapService " + mapServiceName);
						deferred.resolve();
					} else {
						sizeAlreadLoaded += this.replicaBlockSize;
						blockNumber++;

						await this.saveFile(resp, mapServiceId + ".geodatabase", offlineAreaId, true, true);
						this._getGeodatabase(offlineAreaId, mapService, sizeAlreadLoaded, blockNumber, mapServicesLoaded, mapServicesToLoad, deferred);

						let partialPercent = ((blockNumber-1)/numberOfBlocks)*100;
						let param = mapServiceName + " " + partialPercent.toFixed(2) + "% - Replica " + mapServicesLoaded + "/" + mapServicesToLoad;
						console.log(' blockNumber: ', blockNumber);
						dojo.publish('_updatePercentComplete', [param, 'downloadingMap']);
					}
				}
				catch(err) {
					Logger.log("_getGeodatabase error request geodatabase " + err);
				}
				finally {
					geodatabase = null;
				}
			
			},
			
			/**
			 * Save the Replica geodatabase from MapManager
			 */
			_saveReplicaFromMapManager: function(offlineAreaId, mapService, mapServicesLoaded, mapServicesToLoad) {
				var deferred = new Deferred();
				var mapServiceName = mapService.name;
				dojo.publish('_updatePercentComplete', [mapServiceName, 'savingMap']);
				this._getGeodatabase(offlineAreaId, mapService, 0, 1,  mapServicesLoaded, mapServicesToLoad, deferred);
				return deferred.promise;
			},
			
			
			/**
			 * Save replicas from map manager to file system recursively.
			 */
			_saveReplicasFromMapManager: function(offlineAreaId, mapServices, mapServicesLoaded, mapServicesToLoad, deferred) {
				if (mapServices.length == 0) {
					deferred.resolve();
				} else {
					var mapService = mapServices.splice(0, 1);
					if (mapService == null) {
						deferred.resolve();
					} else {
						var promiseReplica = this._saveReplicaFromMapManager(offlineAreaId, mapService[0], mapServicesLoaded, mapServicesToLoad);
						promiseReplica.then( lang.hitch( this, function ( response ) {
							this._saveReplicasFromMapManager(offlineAreaId, mapServices, mapServicesLoaded+1, mapServicesToLoad, deferred)
						})).otherwise( lang.hitch( this, function ( ) {
							deferred.reject();
						}))
					}
				}
			},
			
			/**
			 * Save all replicas from Map Manager to the file system
			 */
			_saveAllReplicasFromMapManager: function(offlineAreaId, mapServices) {
				var deferred = new Deferred();
				var mapServicesToLoad = mapServices.length;
				var mapServicesLoaded = 1;
				this._saveReplicasFromMapManager(offlineAreaId, mapServices, mapServicesLoaded, mapServicesToLoad, deferred);
				return deferred.promise;
			},
			
			_loadMapManagerData: function(mobileMaximoSpatial) {
				var deferred = new Deferred();
				mobileMaximoSpatial.loadMapManager(false, lang.hitch(this, function(ok) {
					mobileMaximoSpatial._loadLayers( mobileMaximoSpatial.mapManager, lang.hitch(this, function() {
						deferred.resolve();
					}));
				}), lang.hitch(this, function(error) {
					deferred.reject()
				}))
				
				return deferred.promise;
			},
			
			
			downloadOfflineMap: function(mobileMaximoSpatial, offlineAreaId) {
				var deferred = new Deferred();
				var checkPermissionPromise = this.checkPermission();
				checkPermissionPromise.then(lang.hitch(this, function(){
					var checkOfflineAreaPromise = this.checkConfigurationForOfflineArea(offlineAreaId);
					checkOfflineAreaPromise.then(lang.hitch(this, function() {
						//The data is ok, no download is necessary
						deferred.resolve();
					})).otherwise(lang.hitch(this, function() {
						
						var loadMapManagerRecord = this._loadMapManagerData(mobileMaximoSpatial);
						loadMapManagerRecord.then(lang.hitch(this, function() {
							// Do the download
							var mapManager = mobileMaximoSpatial.mapManager;
							var layersToRequest = [];
							mapManager.mapServicesList.forEach(lang.hitch(this, function(layer) {
								if (!layer.isBasemap) {
									var offlineAreas = mapManager.currentMapSite['spi_spatial:oslcofflinearea'];
									offlineAreas.forEach(lang.hitch(this, function(offlineArea) {
										if (offlineArea['spi_spatial:offlineareauid'] == offlineAreaId) {
											var replicas = offlineArea['spi_spatial:OFFLINEMAPSERVICEREPLICA'];
											replicas.forEach(lang.hitch(this, function(replica) {
												var serviceId = replica['spi_spatial:mapserviceuid'];
												if (serviceId == layer.id) {
													layersToRequest.push({
														'id': layer.id,
														'name': layer.name,
														'sizeMb': replica['spi_spatial:geodatabasesize']
													});
												}
												
											}))
										}
									}))
									
									
								}
							}));
							
							var promiseSaveReplicas = this._saveAllReplicasFromMapManager(offlineAreaId, layersToRequest);
							promiseSaveReplicas.then( lang.hitch( this, function ( response ) {
								var promiseSaveAreaMetadata = this.downloadOfflineAreaMetaData(mapManager, offlineAreaId);
								promiseSaveAreaMetadata.then( lang.hitch( this, function ( response ) {
									deferred.resolve();
								})).otherwise(lang.hitch( this, function ( response ) {
									deferred.reject();
								}));
							})).otherwise( lang.hitch( this, function ( ) {
								deferred.reject();
							}))
						})).otherwise(lang.hitch(this, function() {
							deferred.reject();
						}))
					}))
				})).otherwise(lang.hitch(this, function(error){
					 deferred.reject(error);
				}));
				
				return deferred.promise;
			},
			
			/**
			 * Download the files missing for an offline area, this is necessary if the user just put the .geodatabases in the folder,
			 * Only these files are not enough to load the data, we need the json files as well, this method creates the missing json files
			 * 
			 */
			downloadOfflineAreaMetaData: function(mapManager, offlineAreaId) {
				var deferred = new Deferred();
				var checkPermissionPromise = this.checkPermission();
				checkPermissionPromise.then(lang.hitch(this, function(){
					var checkOfflineAreaPromise = this.checkConfigurationForOfflineArea(offlineAreaId);
					checkOfflineAreaPromise.then(lang.hitch(this, function() {
						// Ok - not necessary to download
						deferred.resolve();
					})).otherwise(lang.hitch(this, function(error) {
						var loadReplicasPromise = this.loadReplicas(offlineAreaId);
						loadReplicasPromise.then(lang.hitch(this, function() {
							var dbsInfos = this.replicasFiles[offlineAreaId].dbs;
							var offlineAreaSelected = null;
							if (dbsInfos != null) {
								var layersToAdd = [];
								mapManager.mapServicesList.forEach(lang.hitch(this, function(layer) {
									var layerId = layer.id;
									var offlineAreas = mapManager.currentMapSite['spi_spatial:oslcofflinearea'];
									offlineAreas.forEach(lang.hitch(this, function(offlineArea) {
										if (offlineArea['spi_spatial:offlineareauid'] == offlineAreaId) {
											offlineAreaSelected = offlineArea;
											var replicas = offlineArea['spi_spatial:OFFLINEMAPSERVICEREPLICA'];
											replicas.forEach(lang.hitch(this, function(replica) {
												var serviceId = replica['spi_spatial:mapserviceuid'];
												if (serviceId == layerId) {
													var layerToAdd = {
															'order': layer.order,
															'visible': layer.defaultVisibility,
															'opacity': layer.defaultOpacity,
															'id': layerId,
															'name': layer.name,
															'dateSync': replica['spi_spatial:replicacreationdate']
													}
													layersToAdd.push(layerToAdd);
												}
												
											}))
										}
									}))
								}));
								
								var promises = [];
								dbsInfos.forEach(lang.hitch(this, function(dbInfo) {
									var filePath = dbInfo.dbFile;
									var mapServiceId = dbInfo.mapServiceId;
									var serviceSelected = null;
									var found = false;
									mapManager.mapServicesList.forEach(lang.hitch(this, function(layer) {
										if (layer.id == mapServiceId) {
											found = true;
											var jsonFeatureServer = layer.jsonFeatureServer;
											var fileName = mapServiceId + ".json";
											// Write configuration for the Feature Server
											var writeJsonFeatureServerPromise = this.saveFile(jsonFeatureServer, fileName, offlineAreaId);
											promises.push(writeJsonFeatureServerPromise);
											
											var internalLayers = JSON.parse(layer.internalLayers);
											
											internalLayers.forEach(lang.hitch(this, function(internalLayer) {
												var content = internalLayer.details;
												var id = content.id;
												var fileName = mapServiceId+"-"+id+".json";
												// Write configuration for each layer inside the Feature Server
												var promiseWrite = this.saveFile(JSON.stringify(content), fileName, offlineAreaId);
												promises.push(promiseWrite);
											}));
										}
									}));
									
									if (!found) {
										Logger.trace("Map Service not found on map manager, map service id: " + mapServiceId);
									}
								}))
								
								//Write configuration for the offline map
								var jsonOfflineMap = {
										"lastSyncDate": (new Date()).toISOString(),
										"expired": false,
										"offlineLastUpdate": (new Date(offlineAreaSelected['spi_spatial:offlinearealastupdate'])).toISOString(),
										'mapServicesConfig': layersToAdd
								}
								var fileName = this.mapConfigFileName;
								var promiseWriteOfflineConfig = this.saveFile(JSON.stringify(jsonOfflineMap), fileName, offlineAreaId);
								promises.push(promiseWriteOfflineConfig);
								
								all(promises).then(function(){
									deferred.resolve();
								}).otherwise(function(error){
									 deferred.reject(error);
								});
							}
						})).otherwise(lang.hitch(this, function(error) {
							deferred.reject(error);
						}))
					}))
				})).otherwise(lang.hitch(this, function(error){
					 deferred.reject(error);
				}));
				
				return deferred.promise;
			},
			
			/**
			 * Convert the geodatabase from a base64 format to a blob
			 */
			b64toBlob: function(b64Data) {

				var sliceSize = 512;
		          var byteCharacters = window.atob(b64Data);
		          
		          var byteArrays = [];

		          for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		        	  var slice = byteCharacters.slice(offset, offset + sliceSize);

		        	  var byteNumbers = new Array(slice.length);
		              for (let i = 0; i < slice.length; i++) {
		                  byteNumbers[i] = slice.charCodeAt(i);
		              }

		              var byteArray = new Uint8Array(byteNumbers);

		              byteArrays.push(byteArray);

		          }

		        return byteArrays;
		  },
			
			/**
			 * Write the file to the plussReplicas/<offlineId> folder
			 */
			saveFile: function(content, fileName, offlineAreaId, isBlob, append) {
				var deferred = new Deferred();
				var blob = null;
				if (isBlob) {
					blob = new Blob(this.b64toBlob(content));
				}else{
					blob = new Blob([content]);
				}
				let directory_path = this._getOfflineStorage();
				let replica = this.replicaFolderName;
				window.resolveLocalFileSystemURL(directory_path, function(dir) {
					Logger.trace("Got replicas dir to write", dir);
					
					dir.getDirectory(replica, { create: true }, function (dirReplicas) {
						dirReplicas.getDirectory(""+offlineAreaId, { create: true }, function (dirOfflineArea) {
							dirOfflineArea.getFile(fileName, {create:true}, function(file) {
								Logger.trace("Creating file", file);
								file.createWriter(function(fileWriter) {
									fileWriter.onwriteend = function(evt) {
							            console.log("content wrote to file");
										fileWriter = null;
										file = null;
							            deferred.resolve();
							        };
							        
							        fileWriter.onerror = function(e) {
							        	console.log('Write failed: ' + e.toString());
						                Logger.log('Write failed: ' + e.toString());
						                deferred.reject(error);
						            }
							        
							        if (append) {
							        	console.log("append data to file, length : " + fileWriter.length);
							        	fileWriter.seek(fileWriter.length);
							        }
							        console.log("Writing data to file, total bytes: " + blob.size);
						            fileWriter.write(blob);
									blob = null;
									content = null;

								}, function(error) {
									Logger.log("Error writing file ", error);
									deferred.reject(error);
								});			
								
							});
					   });
					});
					
				}, function(error) {
		    		deferred.reject(); 
		    	});
				return deferred.promise;
			},
			
			_checkReplicaExpirationDate: function(hasExpired, deferred) {
				var hasOfflineMapsExpired = false;
				var allAreasPromise = this.getOfflineAreasAvailable();
				allAreasPromise.then(lang.hitch(this, function(offlineAreas){
					var promises = [];
					offlineAreas.forEach(lang.hitch(this, function(offlineAreaId) {
						var loadMetaDataOfflineAreaPromise = this.loadReplicas(offlineAreaId);
						promises.push(loadMetaDataOfflineAreaPromise);
					}));
					
					if (promises.length == 0) {
						deferred.resolve(false || hasExpired);
					} else {
						all(promises).then(lang.hitch(this, function(){
							offlineAreas.forEach(lang.hitch(this, function(offlineAreaId) {
								 var offlineMapConfig = this.getOfflineMapConfig(offlineAreaId);
								 if (offlineMapConfig) {
								    var lastSyncDate = offlineMapConfig.lastSyncDate;
								    if (lastSyncDate) {
								    	var syncDaysToExpire = Number(MapProperties.getProperty('si.map.esri.syncDaysToExpire'));
										if (syncDaysToExpire > 0) {
											var dateToExpire = new Date(lastSyncDate);
											dateToExpire.setDate(dateToExpire.getDate() + syncDaysToExpire);
											var today = new Date();
											
											if (dateToExpire < today) {	
												hasOfflineMapsExpired = true;								
											} 
										}
										
								    }
								 }
							}));
							Logger.trace("Has Offline data expired? " + hasOfflineMapsExpired);
							deferred.resolve(hasOfflineMapsExpired || hasExpired);
						})).otherwise(lang.hitch(this, function(error){
							 deferred.reject(error);
						}));
					}
				})).otherwise(function(error){
					 deferred.reject(error);
				});				
			},
			
			/**
			 * Check if has any replica expired.
			 */
			hasReplicasExpired: function(mobileMaximoSpatial) {
				var deferred = new Deferred();
				var self = this;
				var hasExpired = false;
				mobileMaximoSpatial.loadMapManager(false, lang.hitch(this, function(ok) {
					var currentMapSite = mobileMaximoSpatial.mapManager.currentMapSite;
					
					var promiseLoadOfflineConfig = this.loadConfigOfflineAreasAvailable();
					promiseLoadOfflineConfig.then(function() {
						var offlineAreas = currentMapSite['spi_spatial:oslcofflinearea'];
						if (offlineAreas) {
							offlineAreas.forEach(function(offlineArea) {
								var mapManagerOfflineAreaId = offlineArea['spi_spatial:offlineareauid'];
								var offlineMapConfig = self.getOfflineMapConfig(mapManagerOfflineAreaId);
								
								if (offlineMapConfig) {
									var lastUpdateStr = offlineArea['spi_spatial:offlinearealastupdate'];
									var mapConfigLastUpdateStr = offlineMapConfig.offlineLastUpdate;
									
									if (lastUpdateStr && mapConfigLastUpdateStr) {
										var lastUpdate = new Date(lastUpdateStr);
										var mapConfigLastUpdate = new Date(mapConfigLastUpdateStr);
										// Map Manager offline area was updated - mark local offline as expired
										if( mapConfigLastUpdate.getTime() != lastUpdate.getTime() ) {
											var fileName = self.mapConfigFileName;
											offlineMapConfig.expired = true;
											hasExpired = true;
											self.saveFile(JSON.stringify(offlineMapConfig), fileName, mapManagerOfflineAreaId);
										}
									}
								}
							})
							self._checkReplicaExpirationDate(hasExpired, deferred)
						} else {
							self._checkReplicaExpirationDate(hasExpired, deferred);
						}
					}).otherwise(function() {
						self._checkReplicaExpirationDate(hasExpired, deferred);
					});
				}),
				lang.hitch(this, function(error) {
					//No possible to load the map manager, that's ok, just check the replica expiration date
					self._checkReplicaExpirationDate(hasExpired, deferred);
				}))
				
				return deferred.promise;
			},
			
			/**
			 * Main method responsible to load data for an offline area, it executes the queries in an async mode
			 */
			getFeaturesByExtent: function(mobileMaximoSpatial, offlineAreaId) {
				var deferred = new Deferred();
				var promises = [];
				this.totalFeaturesAdded = 0;
				this.showWarningMsg = true;
				this.cancelCurrentSearch = false;
				this._changeWarningDivVisibility(false);
				var maxOrder = 0;
				var map = mobileMaximoSpatial.map;
				var currentResolution = map.getView().getResolution();
				var spatialReference = map.getView().getProjection().getCode();
				spatialReference = spatialReference.replace( /EPSG:/g, "" );
				
				var replicasFiles = this.replicasFiles[offlineAreaId];
				if (replicasFiles) {
					var dbsInfos = replicasFiles.dbs;
					if (dbsInfos != null) {
						var maxOrder = 0;
						dbsInfos.forEach(lang.hitch(this, function(dbInfo) {
							var filePath = dbInfo.dbFile;
							var mapServiceId = dbInfo.mapServiceId;
							var mapServiceConfigSelected = null;
							var offlineMapConfig = this.getOfflineMapConfig(offlineAreaId);
						    if (offlineMapConfig) {
						    	maxOrder = offlineMapConfig.maxOrder;
						    	var mapServicesConfig = offlineMapConfig.mapServicesConfig;
						    	mapServicesConfig.forEach(lang.hitch(this, function(mapServiceConfig) {
						    		var id = mapServiceConfig.id;
						    		if (id == mapServiceId) {
						    			mapServiceConfigSelected = mapServiceConfig;
						    		}
						    	}));
						    	
						    }
						    var layersJsonMapService = dbInfo.jsonLayer.layers;
							var tables = dbInfo.tables;
							var tabledAdded = 0;
							var countLayer = tables.length;
							var zIndexLayer = 0;
							tables.forEach(lang.hitch(this, function(table,index) {
								var layerId = table.layerId;
								var jsonLayer = table.jsonLayer;
								var tableName = table.tableName;
								var idColumn = table.objectIdColumn;
								var extraFields = table.extraFields;
								var geomColumn = table.shapeColumn;
								var originalGeomColumn = table.originalShapeColumn;
								var tableSpatialReference = table.spatialReference;
								var geometryType = table.geometryType;
								var layer = this.layers[mapServiceId+'-'+layerId];
								
								if (layer == null) {
									var vectorLayer = null;
									var minScale = 0;
									var maxScale = 0;
									if (jsonLayer != null) {
										minScale = jsonLayer.minScale;
										maxScale = jsonLayer.maxScale;
									} else {
										Logger.trace("[SpatialReplicaManager] Layers json does not exist for layerId: " + layerId + ", check TPK folder for the file: " + mapServiceId + "-" + layerId + ".json");
									}
									
									if (minScale == null || minScale == 0) {
										vectorLayer = new ol.layer.Vector({
											source: new ol.source.Vector({})
										});
									} else {
										var minResolution = mobileMaximoSpatial.getResolutionFromScale( maxScale );
										var maxResolution = mobileMaximoSpatial.getResolutionFromScale( minScale );
										vectorLayer = new ol.layer.Vector( {
											source : new ol.source.Vector({}),
											minResolution: minResolution,
											maxResolution: maxResolution
										} );
									}
									
									if (jsonLayer) {
										vectorLayer.defaultVisibility = jsonLayer.defaultVisibility;
										vectorLayer.setVisible(jsonLayer.defaultVisibility);
									}
									if (mapServiceConfigSelected) {
										vectorLayer.defaultVisibility = mapServiceConfigSelected.visible;
										vectorLayer.setVisible(mapServiceConfigSelected.visible);
										vectorLayer.setOpacity(mapServiceConfigSelected.opacity);
										vectorLayer.order = mapServiceConfigSelected.order;
									}
									
									vectorLayer.mapServiceId = mapServiceId;
									vectorLayer.layerId = layerId;
									vectorLayer.jsonmapserver = jsonLayer;
									vectorLayer.isFromFileSystem = true;
									this.layers[mapServiceId+'-'+layerId] = vectorLayer;
									mobileMaximoSpatial.cacheLayers.push(vectorLayer);
									layer = vectorLayer;
									map.addLayer(vectorLayer);
									tabledAdded++;
									//var zIndexLayer = this.zIndexShift + maxOrder - mapServiceConfigSelected.order;
									if (index < 1){
										zIndexLayer = this.zIndexShift + countLayer + 2;	
									}else {
										zIndexLayer = (this.zIndexShift + countLayer + 2) - index;
									}									
									zIndexLayer = zIndexLayer  + maxOrder - mapServiceConfigSelected.order;
									layersJsonMapService.forEach(lang.hitch(this, function(layerJsonMapService, i) {
										if (layerJsonMapService.id == layerId) {
											//zIndexLayer = zIndexLayer + i;
										}
									}));
									if (zIndexLayer > this.maxZIndexAdded) {
										this.maxZIndexAdded = zIndexLayer;
									}
									Logger.trace("ZIndex for layer " + layerId + " - mapService " + mapServiceId + " : " + zIndexLayer);
									vectorLayer.setZIndex(zIndexLayer);
									table.layer = vectorLayer;
									mobileMaximoSpatial.moveLayerToTop("plussSketchTool", this.maxZIndexAdded);
									mobileMaximoSpatial.moveLayerToTop("markers", this.maxZIndexAdded);
								} else {
									var sourceLayers = layer.getSource();
							        sourceLayers.clear();
								}
								
								var layerMaxResolution = layer.getMaxResolution();
								var layerMinResolution = layer.getMinResolution();
								var isLayerOnCurrentResolution = true;
								if (layerMaxResolution != null && layerMinResolution != null 
										&& (currentResolution >= layerMaxResolution || currentResolution <= layerMinResolution)) {
									isLayerOnCurrentResolution = false;
								}

								if (layer.getVisible() == true && isLayerOnCurrentResolution) {
									var extent = map.getView().calculateExtent();
									if (spatialReference != tableSpatialReference) {
										extent = ol.proj.transformExtent(extent,'EPSG:' + spatialReference,'EPSG:'+tableSpatialReference);
									}
									
									var bottomLeft = ol.extent.getBottomLeft(extent);
									var topRight = ol.extent.getTopRight(extent);
									var xmin = bottomLeft[0];
									var ymin = bottomLeft[1];
									var xmax = topRight[0];
									var ymax = topRight[1];
									
									var tableParams = {
										'geomColumn': geomColumn,
										'originalGeomColumn': originalGeomColumn,
										'idColumn': idColumn,
										'layerId': layerId,
										'tableName': tableName,
										'mapServiceId': mapServiceId,
										'filePath': filePath,
										'mapSpatialReference': spatialReference,
										'layerSpatialReference': tableSpatialReference,
										'extraFields': extraFields,
										'geometryType': geometryType
									}
									
									promises.push(this.loadFeatures(0, tableParams, xmin, xmax, ymin, ymax, mobileMaximoSpatial));
								}
							}));
							
							this.zIndexShift = this.zIndexShift + tabledAdded;
						}));
						
						all(promises).then(function(){
							deferred.resolve();
						}).otherwise(function(error){
							 deferred.reject(error);
						});
						
					} else {
						deferred.resolve();
					}
				} else {
					deferred.resolve();
				}
				
				
				return deferred.promise;
				
			},
			
			/**
			 * Method to check the replica response.
			 */
			_syncReplicaResponse: function(data, deferred, countCheckStatus, token, mobileMaximoSpatial, dbInfo, syncObject, layersToSync) { 
				if (typeof data === 'string' || data instanceof String) {
					data = JSON.parse(data);
				}
				var dataJson = data;
				if (dataJson.error != null) {
					mobileMaximoSpatial.logEvent('[SpatialReplicaManager] _syncReplica return ERROR, data: ' + data);
			    	var errorJson = {};
				  	var msg = dataJson.error.message;
					errorJson.error = {details: msg };
					deferred.reject(JSON.stringify(errorJson));
			    } else {
			    	if (dataJson.statusUrl) {
			    		setTimeout(lang.hitch(this, function() {
			    			var url = dataJson.statusUrl;
			    			
			    			if (token != null) {
			    				url = url + "?token=" + token + "&f=json";
							} else {
								url = url + "?f=json";
							}
			    			
			    			mobileMaximoSpatial.logEvent('[SpatialReplicaManager] _syncReplica Checking status for url ' + url);
			    			dojo.publish('_updatePercentComplete', [countCheckStatus++, 'checkingReplica']);
			    			mobileMaximoSpatial.proxyHelper.doRequest(url, null, false, false, mobileMaximoSpatial.mapManager).then(lang.hitch(this, function(response) {
			    				if (typeof response === 'string' || response instanceof String) {
			    					response = JSON.parse(response);
			    				}
			    				var replicaStatus = response.status.toLowerCase();
			    				if (replicaStatus != 'completed') {
			    					// if it's in progress, test again after some seconds
			    					if (replicaStatus == 'inprogress' || replicaStatus == 'pending') {
			    						this._syncReplicaResponse(data, deferred, countCheckStatus, token, mobileMaximoSpatial, dbInfo, syncObject, layersToSync);
			    					} else {
			    						var errorJson = {};
			    						deferred.reject({error: "errorSyncingReplica", layerName: layer.name});	
			    					}
			    					
			    				} else {
			    					var responseType = response.responseType;
			    					
			    					if (responseType == 'esriReplicaResponseTypeNoEdits') {
			    						deferred.resolve();
									} else {
			    						var jsonUrl = response.resultUrl;
				    					jsonUrl = jsonUrl.replace(/\/r\//g , "/");
				    					
				    					if (token != null) {
				    						jsonUrl = jsonUrl + "?token=" + token;
										}
				    					
				    					dojo.publish('_updatePercentComplete', ['', 'updatingLocalDB']);
				    					
				    					// The sync is completed, get the json and do the inserts/updates/deletes in the local database
				    					mobileMaximoSpatial.proxyHelper.doRequest(jsonUrl, null, false, false, mobileMaximoSpatial.mapManager).then(lang.hitch(this, function(dataJson) {
				    						mobileMaximoSpatial.logEvent('[MobileMaximoSpatial] _syncReplica return Ok');
				    						
				    						// Update the server gen information
				    						if (dataJson.replicaServerGen == null) {
				    							var layerServerGens = dataJson.layerServerGens;
				    							layerServerGens.forEach(lang.hitch( this, function ( layerServerGen ) {
				    								layersToSync.forEach( lang.hitch( this, function ( layerToSync ) {
				    									var definition = layerToSync.definition;
				    									var id = definition.getElementsByTagName("LayerID")[0].childNodes[0].nodeValue;
				    									var serverGen = definition.getElementsByTagName("ReplicaServerGen")[0].childNodes[0].nodeValue;
				    									
														if (id == layerServerGen.id) {
															definition.getElementsByTagName("ReplicaServerGen")[0].childNodes[0].nodeValue = layerServerGen.serverGen;
														}
													}));											
												}));
											} else {
												syncObject.definition.getElementsByTagName("ReplicaServerGen")[0].childNodes[0].nodeValue = dataJson.replicaServerGen;
											}
				    											
											var edits = dataJson.edits;
											var queries = [];
											edits.forEach( lang.hitch( this, function ( edit ) {	
												var esrijsonFormat = new ol.format.EsriJSON();
								    			var layerId = edit.id;
								    			var features = edit.features;
								    			
								    			// Updated features
								    			var updates = features.updates;
								    			if (updates.length > 0) {
								    				var featuresToUpdate = [];
								    				updates.forEach( lang.hitch( this, function ( featureUpdated ) {
								    					var featureOpenLayer = esrijsonFormat.readFeature( featureUpdated );
								    					featureOpenLayer.attributes = featureUpdated.attributes;
								    					featuresToUpdate.push(featureOpenLayer);
								    				}));	
								    				mobileMaximoSpatial.logEvent("Sync - Features to update: " + featuresToUpdate.length);
								    				queries = queries.concat(this._prepareUpdateQueries(featuresToUpdate, layerId, dbInfo, mobileMaximoSpatial));
							    					
								    			}
												
								    			// New features
								    			var adds = features.adds;
								    			if (adds.length > 0) {
								    				var featuresToAdd = [];
								    				adds.forEach( lang.hitch( this, function ( featureAdded ) {
								    					var featureOpenLayer = esrijsonFormat.readFeature( featureAdded );
								    					featureOpenLayer.attributes = featureAdded.attributes;
								    					featuresToAdd.push(featureOpenLayer);
								    				}));
								    				mobileMaximoSpatial.logEvent("Sync - Features to add: " + featuresToAdd.length);
								    				queries = queries.concat(this._prepareInsertQueries(featuresToAdd, layerId, dbInfo, mobileMaximoSpatial));
												}
								    			
								    			// Deleted features
								    			var deleteIds = features.deleteIds
								    			if (deleteIds.length > 0) {
								    				queries = queries.concat(this._prepareDeleteQueries(deleteIds, layerId, dbInfo, mobileMaximoSpatial));				
								    			}	
											} ) );
											
											if (queries.length > 0) {
												var filePath = dbInfo.dbFile;
												var promiseQueries = this._execQueries(queries, filePath, "updatingFeaturesCountLocalDB");
												promiseQueries.then(lang.hitch(this, function(dataJson) {
													deferred.resolve();
												})).otherwise(function(error) {
													deferred.reject(error);
												});	
											} else {
												deferred.resolve();
											}
											
			    					}))
			    				}
			    			}
			    		}))
			    	}), mobileMaximoSpatial.timeToCheckReplica);
			    }
			   }
			},
			
			/**
			 * Execute queries for a particular page
			 */
			_execQueriesPage: function(queries, filePath) {
				var deferred = new Deferred();
				var queriesObj = [];
				queries.forEach(function(query, i) {
					//Remove % caracter on query   
        			query = query.replaceAll('%',''); 
					queriesObj.push({'sql':query, 'qid':i, 'params': []});
					var msg = "Query to execute: " + query;
					Logger.trace(msg);
					console.log(msg);
				});
				var msg = "Database: " + filePath
				Logger.trace(msg);
				console.log(msg);
				cordova.exec(
						// success - db read
						function(object) { 
							var msg = "DB return: " + object.length;
							Logger.trace(msg);
							console.log(msg);
							var error = false;
							if (object.length > 0) {
								object.forEach(function(result) {
									if (result.type == "error") {
										deferred.reject();
										error = true;
									}
								})
								if (!error) {
									deferred.resolve(object);
								}
								
							} else {
								deferred.reject();
							}
						}, 
						// failed
						function(errorMsg) {
							Logger.log("[_execQueries] failed to resolve, error message: " + errorMsg);
							deferred.reject();
						}, 
						'SQLitePlugin', 
						 'executeSqlBatch', 
	    				 [{
	    					'dbargs': {
	    					 		'dbname':filePath
	    				 	},
	    				 	'executes': queriesObj
	    				 		
	    				 }]
					);
				return deferred.promise;
			},
			
			/**
			 * SQLIte has a limit of queries to be executed, so it's necessary to page it.
			 */
			_execQueriesTotal: function(queries, filePath, deferred, msgProgress, totalToRun, numberExecutions, result) {
				var queriesLen = queries.length;
				if (queriesLen == 0) {
					deferred.resolve(result);
				} else {
					var queriesToExec = [];
					var index = queries.length;
					if (queriesLen > this.syncQueriesLimit) {
						index = this.syncQueriesLimit;
					}
					queriesToExec = queries.splice(0, index);
					if (msgProgress) {
						numberExecutions = numberExecutions + queriesToExec.length;
						var param = parseFloat(( numberExecutions * 100 )/totalToRun).toFixed(2);
						dojo.publish('_updatePercentComplete', [param, msgProgress]);
							
					}
					var promiseExec = this._execQueriesPage(queriesToExec, filePath);
					promiseExec.then(lang.hitch(this, function(dataJson) {
						result = result.concat(dataJson);
						this._execQueriesTotal(queries, filePath, deferred, msgProgress, totalToRun, numberExecutions, result);	
					})).otherwise(function(error) {
						deferred.reject();
					});
				}
			},
			
			/**
			 * Method to execute multiple queries in the geodatabase
			 */
			_execQueries: function(queries, filePath, msgProgress) {
				var deferred = new Deferred();
				this._execQueriesTotal(queries, filePath, deferred, msgProgress, queries.length, 0, []);
				return deferred.promise;
			},
			
			/**
			 * Prepare queries to delete features
			 */
			_prepareDeleteQueries: function(deleteIds, layerId, dbInfo, mobileMaximoSpatial) {
				var queries = [];
				var self = this;
				var filePath = dbInfo.dbFile;
				var tableParams = null;
				var tables = dbInfo.tables;
				tables.forEach(lang.hitch(this, function(table) {
					var currentLayerId = table.layerId;
					if (currentLayerId == layerId) {
						tableParams = table;
					}
				}));
				
				if (tableParams == null) {
					deferred.reject();
				} else {
					var tableName = tableParams.tableName;
					var idColumn= tableParams.objectIdColumn;
					var countFeaturesToDelete = deleteIds.length;
					deleteIds.forEach( lang.hitch( this, function ( globalid ) {
						var querySelectOID = "select gdb_archive_oid from " + tableName + " where globalid='"+globalid+"'";
						var queryDeleteBbox = "delete from st_spindex__" + tableName + "_shape where pkid=("+querySelectOID+");";
						queries.push(queryDeleteBbox);
						
						var queryDeleteRecord = "delete from " + tableName + " where globalid='"+globalid+"';";
						queries.push(queryDeleteRecord);
					}));
				}
				return queries;
			},
			
			/*
			 * There are some fields that comes with . (dots) to separate the schema, it's necessary to remove them.
			 */
			_cleanAttributeName: function(attributeName) {
				var indexOfPoint = attributeName.lastIndexOf(".");
				if (indexOfPoint > -1) {
					attributeName = attributeName.substring(indexOfPoint+1);
				}
				return attributeName;
			},
			
			/**
			 * Prepare queries to update features
			 */
			_prepareUpdateQueries: function(features, layerId, dbInfo, mobileMaximoSpatial) {
				var queries = [];
				var self = this;
				var filePath = dbInfo.dbFile;
				var tableParams = null;
				var tables = dbInfo.tables;
				tables.forEach(lang.hitch(this, function(table) {
					var currentLayerId = table.layerId;
					if (currentLayerId == layerId) {
						tableParams = table;
					}
				}));
				
				if (tableParams == null) {
					deferred.reject();
				} else {
					var tableName = tableParams.tableName;
					var idColumn= tableParams.objectIdColumn;
					var shapeColumn = tableParams.shapeColumn;
					var jsonLayer = tableParams.jsonLayer;
					var fields = jsonLayer.fields;
					var countFeaturesToUpdate = features.length;
					features.forEach( lang.hitch( this, function ( feature ) {
						var attributes = feature.attributes;
						var objectIdValue = mobileMaximoSpatial.getAttributeValue(attributes, "globalid");
						var archiveOIDValue = "select gdb_archive_oid from " + tableName + " where globalid='"+objectIdValue + "'";
						var setStatement = "";
						fields.forEach(lang.hitch(this, function(field) {
							var attributeName = self._cleanAttributeName(field.name);
							var attributeValue = mobileMaximoSpatial.getAttributeValue(attributes, attributeName);
							
							if (attributeName.indexOf("(shape)") == -1) {
								setStatement += attributeName.toLowerCase() + "=";
								if ((field.type == "esriFieldTypeString" || field.type == "esriFieldTypeGlobalID"
									) && attributeValue != null && attributeValue != "null" ) {
									attributeValue = "'" + attributeValue +"'";
								}
								setStatement += attributeValue + ",";
							}
							
						}));
						
						var geometry = feature.getGeometry();
						
						var geoJsonGeometry = self.geoJson.writeGeometry(geometry);
						 
						setStatement += shapeColumn + "='"+geoJsonGeometry+"'";
						
						var queryUpdateTable = "update or ignore " + tableName + " set " + setStatement + " where gdb_archive_oid=("+archiveOIDValue +");";
						queries.push(queryUpdateTable);
						//Calculate BBOX
						var extent = geometry.getExtent();
						var bottomLeft = ol.extent.getBottomLeft(extent);
						var topRight = ol.extent.getTopRight(extent);
						var xmin = bottomLeft[0];
						var ymin = bottomLeft[1];
						var xmax = topRight[0];
						var ymax = topRight[1];
						
						var queryUpdateBbox = "update or ignore st_spindex__" + tableName + "_shape set minx="+xmin+", miny="+ymin+", maxx="+xmax+", maxy="+ymax+" where pkid=("+archiveOIDValue+");";
						queries.push(queryUpdateBbox);
					}));
				}
				return queries;
			},
			
			/**
			 * Prepare queries to insert features
			 */
			_prepareInsertQueries: function(features, layerId, dbInfo, mobileMaximoSpatial) {
				var queries = [];
				var self = this;
				var filePath = dbInfo.dbFile;
				var tableParams = null;
				var tables = dbInfo.tables;
				tables.forEach(lang.hitch(this, function(table) {
					var currentLayerId = table.layerId;
					if (currentLayerId == layerId) {
						tableParams = table;
					}
				}));
				
				if (tableParams == null) {
					deferred.reject();
				} else {
					var tableName = tableParams.tableName;
					var idColumn= tableParams.objectIdColumn;
					var shapeColumn = tableParams.shapeColumn;
					var jsonLayer = tableParams.jsonLayer;
					var fields = jsonLayer.fields;
					var countFeaturesToInsert = features.length;
					features.forEach( lang.hitch( this, function ( feature ) {
						var attributes = feature.attributes;
						var objectIdValue = mobileMaximoSpatial.getAttributeValue(attributes, idColumn);
						
						var geometry = feature.getGeometry();
						
						//Calculate BBOX
						var extent = geometry.getExtent();
						var bottomLeft = ol.extent.getBottomLeft(extent);
						var topRight = ol.extent.getTopRight(extent);
						var xmin = bottomLeft[0];
						var ymin = bottomLeft[1];
						var xmax = topRight[0];
						var ymax = topRight[1];
						
						var maxArchiveOID = " (select max(pkid)+1 from st_spindex__" + tableName + "_shape) "
						
						var attributeNames = "";
						var attributeValues = "";
						fields.forEach(lang.hitch(this, function(field) {
							var attributeName = self._cleanAttributeName(field.name);
							var attributeValue = mobileMaximoSpatial.getAttributeValue(attributes, attributeName);
							
							if (attributeName.indexOf("(shape)") == -1) {
								attributeNames += attributeName.toLowerCase() + ",";
								if ((field.type == "esriFieldTypeString" || field.type == "esriFieldTypeGlobalID"
									) && attributeValue != null && attributeValue != "null" ) {
									attributeValue = "'" + attributeValue +"'";
								}
								
								if (field.type == "esriFieldTypeDate" && attributeValue != null && attributeValue != "null") {
									var esriDate = new Date(attributeValue);
									var esriTime = esriDate.getTime();
									//days since epoch  - subtract offset,  +  days from 4713 B.C. to 1970 A.D.
									//convert Unix Time to julian date/time not include Time Zone
									//time zone include on indentify display method getDateWithTimeZone
									attributeValue = ((esriTime / 86400000) + 2440587.5);
								}
								attributeValues += attributeValue + ",";
							}
							
						}));
						
						var geoJsonGeometry = self.geoJson.writeGeometry(geometry);
						 
						attributeNames += shapeColumn;
						
						attributeValues += "'"+geoJsonGeometry+"'";
						
						var queryInsertTable = "insert or ignore into " + tableName + " (" + attributeNames + ", gdb_archive_oid, gdb_from_date, gdb_to_date) values (" + attributeValues + ", " + maxArchiveOID + ", 0.0, 0.0);";
						queries.push(queryInsertTable);
						
						var queryInsertBbox = "insert or ignore into st_spindex__" + tableName + "_shape(pkid, minx, miny, maxx, maxy) values("+maxArchiveOID+","+xmin+","+ymin+","+xmax+","+ymax+" );";
						queries.push(queryInsertBbox);
						
					}));
				}
				return queries;
			},
			
			/**
			 * Do the request to the server and wait for the answer.
			 */
			_requestSync: function(syncObject, layersToSync, mobileMaximoSpatial, dbInfo) {
				var deferred = new Deferred();
				var syncPerReplica = false;
				var syncModel = syncObject.definition.getElementsByTagName("SyncModel")[0].childNodes[0].nodeValue;
				var serviceUrl = syncObject.definition.getElementsByTagName("ServiceName")[0].childNodes[0].nodeValue;
				
				if (syncModel == "esriSyncModelPerReplica") {
					syncPerReplica = true;
				}
				
				var params = {
						replicaID: syncObject.replicaId,
						transportType:"esriTransportTypeEmbedded",
						dataFormat:"json",
						async: "true",
						f:"pjson"							
				};
				
				if (!syncPerReplica) {						
					var syncLayers = [];
					layersToSync.forEach( lang.hitch( this, function ( layerToSync ) {
						var definition = layerToSync.definition;
						var id = definition.getElementsByTagName("LayerID")[0].childNodes[0].nodeValue;
						var serverGen = definition.getElementsByTagName("ReplicaServerGen")[0].childNodes[0].nodeValue;
						
						var layerToSync = {};
						layerToSync.id = id;
						layerToSync.syncDirection = "download";
						layerToSync.serverGen = serverGen;
						
						syncLayers.push(layerToSync);														
					}));
					
					params.syncLayers = JSON.stringify(syncLayers);
				} else {
					var replicaServerGen = syncObject.definition.getElementsByTagName("ReplicaServerGen")[0].childNodes[0].nodeValue;
					params.replicaServerGen = replicaServerGen;
					params.syncDirection = 'download';
				}
				
				var promise = mobileMaximoSpatial.tokenAuthentication.generateTokens([serviceUrl], mobileMaximoSpatial.mapManager, true);
				promise.then(lang.hitch(this, function(tokens) {			
					var i=0;
					for (var url in tokens) {
						if (url == serviceUrl) {
								var replicaUrl = serviceUrl + "/synchronizeReplica";
								var token = tokens[url];
							    var tokenValue = token.tokenValue;
							    if (tokenValue) {
							    	replicaUrl = replicaUrl + "?token=" + tokenValue;
								}
							    
							    mobileMaximoSpatial.proxyHelper.doRequest(replicaUrl, params, true, false, mobileMaximoSpatial.mapManager).then(lang.hitch(this, function(dataJson) {
							    	this._syncReplicaResponse(dataJson, deferred, 0, tokenValue, mobileMaximoSpatial, dbInfo, syncObject, layersToSync);
							    })).otherwise(function(error) {
								  	var errorJson = {};
								  	var msg = MessageService.createResolvedMessage('errorSyncingReplica', [serviceUrl]);
									errorJson.error = {details: msg };
									deferred.reject(JSON.stringify(errorJson));
							    });
						}									
					}
				}));
				return deferred.promise;
			},
			
			_queryMetadataSync: function(dbInfo, mobileMaximoSpatial) {
				var deferred = new Deferred();
				var filePath = dbInfo.dbFile;
				var self = this;
				
				// First search for the metadata for the replica
				var queryReplicaMetadata = "select i.uuid as uuid, i.definition as definition, t.name as name " + 
												"from GDB_Items i, GDB_ItemTypes t where t.uuid=i.type and (t.name='Sync Replica' or t.name='Sync Dataset')";
				mobileMaximoSpatial.logEvent("Query for sync metadata: " + queryReplicaMetadata);
				cordova.exec(
						// success - db read
						function(object) { 
							var layersToSync = [];
							var syncObject = {};
							if (object.length > 0) {
								var rows = object[0].result.rows;
								var rowsLength = rows.length;
								
						        if (rows.length > 0) {
										rows.forEach(lang.hitch(this, function(row) {
											try {
												var uuid = row.uuid;
												var definition = row.definition;
												var name = row.name;
												var parser = new DOMParser();
												// get the replicaId
												if (name == 'Sync Replica') {
													syncObject.replicaId = uuid;
													syncObject.definition = parser.parseFromString(definition,"text/xml");
												} else {
													// Get the layers configuration
													var layerObj =  {};
													layerObj.uuid = uuid;
													layerObj.definition  = parser.parseFromString(definition,"text/xml");
													layersToSync.push(layerObj);
												}
											} catch(err) { 
												Logger.trace("Error - Loading Sync metadata " + err);
												deferred.reject(err);
											}
											
									    }));
										var syncModel = syncObject.definition.getElementsByTagName("SyncModel")[0].childNodes[0].nodeValue;
										var serviceName = syncObject.definition.getElementsByTagName("ServiceName")[0].childNodes[0].nodeValue;
										var promiseRequestSyncDB = self._requestSync(syncObject, layersToSync, mobileMaximoSpatial, dbInfo); 
										promiseRequestSyncDB.then(lang.hitch(this, function() {
											//Update DB with the new replica server gen
											var xmlSerializer = new XMLSerializer();
											var queries = [];
											var definitionReplica = xmlSerializer.serializeToString(syncObject.definition);
											let formatdefinitionReplica = definitionReplica.replace(/'/g,"''");
											var queryUpdateReplicaMetadata = "update or ignore gdb_items set definition='"+formatdefinitionReplica+"' where uuid='" + syncObject.replicaId + "'";
											queries.push(queryUpdateReplicaMetadata);
											layersToSync.forEach(function(layerToSync) {
												var definitionTable = xmlSerializer.serializeToString(layerToSync.definition);
												let formatdefinitionTable = definitionTable.replace(/'/g,"''");
												var uuid = layerToSync.uuid;
												var queryUpdateTableMetadata = "update or ignore gdb_items set definition='"+formatdefinitionTable+"' where uuid='" + uuid + "'";
												queries.push(queryUpdateTableMetadata);
											});
											var filePath = dbInfo.dbFile;
											var promiseInsert = self._execQueries(queries, filePath);
											promiseInsert.then(lang.hitch(this, function(dataJson) {
												deferred.resolve();		
											})).otherwise(function(error) {
												deferred.reject();
											});
										})).otherwise(lang.hitch(this, function() {
											deferred.reject();
										}))
									} else {
										deferred.reject();
									}
						        } else {
						        	deferred.reject();
						        }
						}, 
						// failed
						function(errorMsg) {
							Logger.log("[SQLitePlugin] failed to resolve, error message: " + errorMsg);
							deferred.resolve();
						}, 
						'SQLitePlugin', 
						 'executeSqlBatch', 
	    				 [{
	    					'dbargs': {
	    					 		'dbname':filePath
	    				 	},
	    				 	'executes': [
	    						{'sql':queryReplicaMetadata, 'qid':'1', 'params': []}
	    					]
	    				 		
	    				 }]
					);
				return deferred.promise;
			},
			
			
			/**
			 * Sync all the databases synchronously
			 */
			_syncDbsSynchronously: function(dbsToSync, offlineAreaId, mobileMaximoSpatial, deferred, i, lastUpdateOfflineArea) {
				if (i == dbsToSync.length) {
					
					// Update the config file with the last sync date
					var offlineMapConfig = this.getOfflineMapConfig(offlineAreaId);
					offlineMapConfig.lastSyncDate = (new Date()).toISOString();
					
					var fileName = this.mapConfigFileName;
					offlineMapConfig.expired = false;
					offlineMapConfig.offlineLastUpdate = lastUpdateOfflineArea.toISOString(); 
					var promiseWriteOfflineConfig = this.saveFile(JSON.stringify(offlineMapConfig), fileName, offlineAreaId);
					promiseWriteOfflineConfig.then(lang.hitch(this, function() {
						deferred.resolve();
					})).otherwise(lang.hitch(this, function() {
						deferred.reject();
					}))
				} else {
					var dbToSync = dbsToSync[i];
					
					var mapServiceId = dbToSync.mapServiceId;
					var serviceName = null;
					var offlineMapConfig = this.getOfflineMapConfig(offlineAreaId);
				    if (offlineMapConfig) {
				    	var mapServicesConfig = offlineMapConfig.mapServicesConfig;
				    	mapServicesConfig.forEach(lang.hitch(this, function(mapServiceConfig) {
				    		var id = mapServiceConfig.id;
				    		if (id == mapServiceId) {
				    			serviceName = mapServiceConfig.name;
				    		}
				    	}));
				    }
				    
				    dojo.publish('_updatePercentComplete', [serviceName, 'syncReplica']);
				    
					var promiseSyncDB = this._queryMetadataSync(dbToSync, mobileMaximoSpatial);
					promiseSyncDB.then(lang.hitch(this, function() {
						this._syncDbsSynchronously(dbsToSync, offlineAreaId, mobileMaximoSpatial, deferred, i+1, lastUpdateOfflineArea);
					})).otherwise(lang.hitch(this, function() {
						deferred.reject();
					}))
				}
			},
			
			_syncDbs: function(dbsToSync, offlineAreaId, mobileMaximoSpatial, i, lastUpdateOfflineArea) {
				var deferred = new Deferred();
				this._syncDbsSynchronously(dbsToSync, offlineAreaId, mobileMaximoSpatial, deferred, i, lastUpdateOfflineArea);
				return deferred.promise;
			},
			
			
			_deleteMapServiceOfflineData: function(mapServicesToDelete, offlineAreaId) {
				var deferred = new Deferred();
				var self = this;
				if (mapServicesToDelete.length == 0) {
					deferred.resolve();
				} else {
					var mapConfig = this.getOfflineMapConfig(offlineAreaId);
					var directory_path = this._getOfflineStorage() + "/" + this.replicaFolderName + "/" + offlineAreaId;
					window.resolveLocalFileSystemURL(directory_path, function(dir) {
						var reader = dir.createReader();
					    reader.readEntries(
					        function (entries) {
					        	for (i=0; i<entries.length; i++) {
					        		var entry = entries[i];
					        		var entryName = entry.name.toLowerCase();
					        		mapServicesToDelete.forEach(function(mapServiceId) {
					        			var jsonPattern = mapServiceId + "-";
					        			var mapServiceJson = mapServiceId + ".json";
					        			var geodatabse = mapServiceId + ".geodatabase";
					        			if (entryName.indexOf(jsonPattern) > -1 || entryName == geodatabse || entryName == mapServiceJson) {
					        				entry.remove();
					        			}
					        			var indexToRemove = -1;
					        			mapConfig.mapServicesConfig.forEach(lang.hitch(this, function(mapServiceConfig, i) {
					        				if (mapServiceConfig.id == mapServiceId) {
					        					indexToRemove = i;
											}
										}));
					        			if (indexToRemove > -1) {
					        				mapConfig.mapServicesConfig.splice(indexToRemove, 1);
					        			}
					        		})
					            }
					        	
					        	var promiseWriteOfflineConfig = self.saveFile(JSON.stringify(mapConfig), self.mapConfigFileName, offlineAreaId);
								promiseWriteOfflineConfig.then(function() {
									deferred.resolve();
								}).otherwise(function() {
									deferred.reject(error); 
								});
					        },
					        function (err) {
					        	deferred.reject(err); 
					        }
					      );
					}, function(error) {
				    	deferred.reject(error); 
				    });
				}
				
				return deferred.promise;
			},
			
			/**
			 * Method to Synchronize an Offline Map using replicas storage in the file system (.geodatabases)
			 */
			syncOfflineMap: function(offlineAreaId, mobileMaximoSpatial) {
				var deferred = new Deferred();
				var promises = [];
				var configOk = this.checkConfigurationForOfflineArea(offlineAreaId);
				var lastUpdateOfflineArea = null;
		    	configOk.then(lang.hitch(this, function(ok) {
		    		var loadMapManagerRecord = this._loadMapManagerData(mobileMaximoSpatial);
					loadMapManagerRecord.then(lang.hitch(this, function() {
						var mapManager = mobileMaximoSpatial.mapManager;
						
						var dbsInfos = this.replicasFiles[offlineAreaId].dbs;
						if (dbsInfos != null) {
							var mapConfig = this.getOfflineMapConfig(offlineAreaId);
							var mapServicesToDelete = [];
							var mapServicesToAdd = [];
							
							var currentMapSite = mapManager.currentMapSite;
							var offlineAreas = currentMapSite['spi_spatial:oslcofflinearea'];
							offlineAreas.forEach(lang.hitch(this, function(offlineArea) {
								if (offlineArea['spi_spatial:offlineareauid'] == offlineAreaId) {
									var dbs = this.replicasFiles[offlineAreaId].dbs;
									lastUpdateOfflineArea = new Date(offlineArea['spi_spatial:offlinearealastupdate']);
									var mapConfigLastUpdate = new Date(mapConfig.offlineLastUpdate);
									// Map Manager offline area was updated - need to verify what changed
									if( mapConfigLastUpdate.getTime() != lastUpdateOfflineArea.getTime() ) {
										dbs.forEach(lang.hitch(this, function(db) {
											db.toBeDeleted = true;
										}))
										
										var mapManagerReplicas = offlineArea['spi_spatial:OFFLINEMAPSERVICEREPLICA'];
										if (mapManagerReplicas) {
											mapManagerReplicas.forEach(lang.hitch(this, function(mapManagerReplica) {
												var mapServiceId = mapManagerReplica['spi_spatial:mapserviceuid'];
												var creationDate = mapManagerReplica['spi_spatial:replicacreationdate'];
												var size = mapManagerReplica['spi_spatial:geodatabasesize'];
												var replicaFound = false;
												var expired = false;
												
												dbs.forEach(lang.hitch(this, function(db) {
													var dbMapServiceId = db.mapServiceId;
													if (dbMapServiceId == mapServiceId) {
														replicaFound = true;
														mapConfig.mapServicesConfig.forEach(lang.hitch(this, function(mapServiceConfig) {
															if (mapServiceConfig.id == dbMapServiceId) {
																var mapServiceDate = new Date(mapServiceConfig.dateSync);
																if( creationDate != null && mapServiceDate.getTime() == new Date(creationDate).getTime() ) {
																	db.toBeDeleted = false;
																} 
															}
														}))
													} 
												}))
												
												if (!replicaFound) { 
													mapManager.mapServicesList.forEach(lang.hitch(this, function(layer) {
														if (layer.id == mapServiceId) {
															mapServicesToAdd.push({
																'id': layer.id,
																'name': layer.name,
																'sizeMb': size
															});
														}
													}));
												}
											}))
										}
										
										dbs.forEach(lang.hitch(this, function(db) {
											if (db.toBeDeleted) {
												mapServicesToDelete.push(db.mapServiceId);
											}
										}))
										
									}	
								}
							}));
							
							//Step 1: Delete the orphan replicas
							dojo.publish('_updatePercentComplete', ['', 'syncStep1']);
							var promiseDeleteOrphan = this._deleteMapServiceOfflineData(mapServicesToDelete, offlineAreaId);
							promiseDeleteOrphan.then(lang.hitch(this, function(ok) {
								var dbsToSync = [];
								var dbs = this.replicasFiles[offlineAreaId].dbs;
								dbs.forEach(lang.hitch(this, function(dbInfo) {
									if (!dbInfo.toBeDeleted) {
										dbsToSync.push(dbInfo);
									}
									
								}));
								//Step 2: Sync the remaining replicas (not updated on map manager)
								dojo.publish('_updatePercentComplete', ['', 'syncStep2']);
								var promiseSyncDB = this._syncDbs(dbsToSync, offlineAreaId, mobileMaximoSpatial, 0, lastUpdateOfflineArea);
								promiseSyncDB.then(lang.hitch(this, function(ok) {
									
									//Step 3: Download the new replicas created on map manager
									dojo.publish('_updatePercentComplete', ['', 'syncStep3']);
									var promiseDownloadNewReplicas = this._saveAllReplicasFromMapManager(offlineAreaId, mapServicesToAdd);
									promiseDownloadNewReplicas.then(lang.hitch(this, function(ok) { 
										
										var promiseOfflineEmpty = this._deleteOfflineMapIfDirEmpty(offlineAreaId);
										promiseOfflineEmpty.then(lang.hitch(this, function(isEmpty) { 	
											if (isEmpty) {
												deferred.resolve();
											} else {
												//Step 4 (opcional): Download the metadata for the news replicas created (json files)
												dojo.publish('_updatePercentComplete', ['', 'syncStep4']);
												var promiseSaveAreaMetadata = this.downloadOfflineAreaMetaData(mapManager, offlineAreaId);
												promiseSaveAreaMetadata.then( lang.hitch( this, function ( response ) {
													deferred.resolve();
												})).otherwise(lang.hitch( this, function ( response ) {
													deferred.reject();
												}));
											}
										})).otherwise(lang.hitch(this, function(error) {
											deferred.reject(error);
										}))
									})).otherwise(lang.hitch(this, function(error) {
										deferred.reject(error);
									}))
								})).otherwise(lang.hitch(this, function(error) {
									deferred.reject(error);
								}))
							})).otherwise(lang.hitch(this, function(error) {
								deferred.reject(error);
							}))
							
							
							
						} else {
							deferred.reject();
						}
					})).otherwise(lang.hitch(this, function() {
						deferred.reject();
					}))
		    		
		    	})).otherwise(lang.hitch(this, function(error) {
		    		deferred.reject(error);
		    	}));
		    	return deferred.promise;
				
			},
			
			
			_deleteOfflineMapIfDirEmpty: function(offlineAreaId) {
				var deferred = new Deferred();
				var self = this;
				//Check if exists any geodatabase in the folder, if not delete the entire folder
				var directory_path = this._getOfflineStorage() + "/" + this.replicaFolderName + "/" + offlineAreaId + "/";
				window.resolveLocalFileSystemURL(directory_path, function(dir) {
					var reader = dir.createReader();
				    reader.readEntries(
				        function (entries) {
				        	var existsDB = false;
				        	for (i=0; i<entries.length; i++) {
				        		var entry = entries[i];
				        		var entryName = entry.name.toLowerCase();
				        		if (entryName.indexOf(".geodatabase") > -1) {
				        			existsDB = true;
				        		}
				            }
				        	
				        	if (existsDB) {
				        		deferred.resolve(false);
				        	} else {
				        		var promiseDeleteOfflineMap = self.deleteOfflineData(offlineAreaId);
				        		promiseDeleteOfflineMap.then(function() {
				        			deferred.resolve(true);
								}).otherwise(function(err) {
									deferred.reject(err); 
								})
				        	}
				        },
				        function (err) {
				        	deferred.reject(err); 
				        }
				      );
				}, function(error) {
			    	deferred.reject(error); 
			    });
				return deferred.promise;
			},
			
	});
});
