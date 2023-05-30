/*
 * Licensed Materials - Property of IBM
 *
 * (C) COPYRIGHT IBM CORP. 2016,2020 
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

/**
 * createdBy: Chandrasekar Mohan
 * 
 */

require(
		[
				"dojo/_base/declare", "dojo/_base/lang", "dojo/Deferred", "dojo/promise/all", "platform/store/PersistenceManager",
				"platform/map/spatial/store/MaximoSpatialStore", "dojo/_base/array", "platform/map/MapProperties",
				"platform/comm/CommunicationManager", "platform/logging/Logger", "platform/map/spatial/proxy/ProxyHelper"
		],
		function ( declare, lang, Deferred, all, PersistenceManager, MaximoSpatialStore, array, MapProperties, CommunicationManager, Logger, ProxyHelper ) {

			declare(
					"platform.map.esriTileCacheManager",
					null,
					{

						tileInfo : null,
						initialExtent : null,
						minZ : null,
						maxZ : null,
						tileSize : null,
						tileOrigin : null,
						maximoSpatialStore: null,
						offlineAreaId: null,
						numberOfRequests: null,
						proxyHelper: null,
						
						constructor : function ( options ) {
							this.maximoSpatialStore = new platform.map.spatial.store.MaximoSpatialStore();
							this.numberOfRequests = MapProperties.getProperty('si.map.esri.numberOfRequests');
							this.proxyHelper = new platform.map.spatial.proxy.ProxyHelper();
						},

						updateProgressBar : function ( inProgressValue, maxValue ) {
							var newValue = Math.floor( ( 100 / maxValue ) * inProgressValue )
							dojo.publish('_updatePercentComplete', [newValue]);
						},
						
						hideProgressBar : function () {
							dojo.publish('_closePercentDialog', []);
						},

						createTileCache : function ( layerBasemap, extent, minZoom, maxZoom, offlineAreaSelected ) {
							var  offlineAreaName = offlineAreaSelected['spi_spatial:mblareaname'];
							this.offlineAreaId = offlineAreaSelected['spi_spatial:offlineareauid'];
							this.initialExtent = extent;
							var mblExtent = offlineAreaSelected['spi_spatial:mblextent'];
							var spatialReference = JSON.parse(mblExtent).spatialReference;
							this.minZ = minZoom;
							this.maxZ = maxZoom;
							this.url = layerBasemap.url;
							console.log( "Get Tile Info!!!" );
							this.parseTileInfo( layerBasemap.jsonMapServer );
							
							var initZoom = Number(offlineAreaSelected['spi_spatial:mblinitzoom']);
							var finalZoom = Number(offlineAreaSelected['spi_spatial:mblfnlzoom']);
							
							var jsonMapServer = JSON.parse(layerBasemap.jsonMapServer);
							var tileInfo = jsonMapServer.tileInfo;
							var resolutions = [];
							if (tileInfo != null) {
								var lods = tileInfo.lods;
								array.forEach( lods, lang.hitch( this, function ( lod, i ) {
									var level = lod.level;
									var resolution = lod.resolution;
									if (level >= initZoom && level <= finalZoom && resolutions.indexOf(resolution) == -1) {
										resolutions.push(resolution);
									}
								}))	
							}
							
							
							this.maximoSpatialStore.addOfflineArea( offlineAreaName, this.offlineAreaId, this.minZ, this.maxZ, this.initialExtent, resolutions, spatialReference );
						},

						getCellIdFromXy : function ( x, y, level ) {
							var col = Math.floor( ( x - this.tileInfo.origin.x ) / ( this.tileInfo.cols * this.tileInfo.lods[ level ].resolution ) );
							var row = Math.floor( ( this.tileInfo.origin.y - y ) / ( this.tileInfo.rows * this.tileInfo.lods[ level ].resolution ) );
							return [
									col, row
							];
						},

						getCellPolygonFromCellId : function ( cellId, level ) {
							var col1 = cellId[ 0 ];
							var row1 = cellId[ 1 ];
							var col2 = col1 + 1;
							var row2 = row1 + 1;

							var x1 = this.tileInfo.origin.x + ( col1 * this.tileInfo.cols * this.tileInfo.lods[ level ].resolution );
							var y1 = this.tileInfo.origin.y - ( row1 * this.tileInfo.rows * this.tileInfo.lods[ level ].resolution );
							var x2 = this.tileInfo.origin.x + ( col2 * this.tileInfo.cols * this.tileInfo.lods[ level ].resolution );
							var y2 = this.tileInfo.origin.y - ( row2 * this.tileInfo.rows * this.tileInfo.lods[ level ].resolution );

							var polygon;
							var spatialReference = this.tileInfo.spatialReference;

							require( [
								"esri/geometry/Polygon"
							], function ( Polygon ) {
								polygon = new Polygon( spatialReference );
							} );

							polygon.addRing( [
									[
											x1, y1
									], // clockwise
									[
											x2, y1
									], [
											x2, y2
									], [
											x1, y2
									], [
											x1, y1
									]
							] );
							return polygon;
						},

						getAllCellIdsInExtent : function ( extent, gridLevel ) {
							var cellId0 = this.getCellIdFromXy( extent[ 0 ], extent[ 1 ], gridLevel );
							var cellId1 = this.getCellIdFromXy( extent[ 2 ], extent[ 3 ], gridLevel );

							var i, j;
							var i0 = Math.max( Math.min( cellId0[ 0 ], cellId1[ 0 ] ), this.tileInfo.lods[ gridLevel ].startTileCol );
							var i1 = Math.min( Math.max( cellId0[ 0 ], cellId1[ 0 ] ), this.tileInfo.lods[ gridLevel ].endTileCol );
							var j0 = Math.max( Math.min( cellId0[ 1 ], cellId1[ 1 ] ), this.tileInfo.lods[ gridLevel ].startTileRow );
							var j1 = Math.min( Math.max( cellId0[ 1 ], cellId1[ 1 ] ), this.tileInfo.lods[ gridLevel ].endTileRow );

							var cellIds = [];

							for ( i = i0; i <= i1; i++ ) {
								for ( j = j0; j <= j1; j++ ) {
									cellIds.push( [
											i, j
									] );
								}
							}
							return cellIds;
						},

						getAllTiles : function (mapManager) {

							var deferred = new Deferred();

							var cells = [];

							for ( var level = this.minZ; level <= this.maxZ; level++ ) {
								var level_cell_ids = this.getAllCellIdsInExtent( this.initialExtent, level );

								level_cell_ids.forEach( function ( cell_id ) {
									cells.push( {
										level : level,
										row : cell_id[ 1 ],
										col : cell_id[ 0 ]
									} );
								} );

								// if the number of requested tiles is excessive, we just stop
								if ( cells.length > 5000 ) {
									console.log( "enough is enough!" );
									break;
								}
							}
							
							this.getAllTilesFromServer( cells, 0, deferred, [], mapManager );

							return deferred.promise;
						},

						getAllTilesFromServer : function ( cells, i, deferred, urlRequest, mapManager ) {
							var url = "";
							var self = this;
							
							if ( cells.length > i ) {

								self.updateProgressBar( i, cells.length );

								var cell = cells[ i ];

								var level = cell.level;
								var row = cell.row;
								var col = cell.col;

								url = this.url + "/tile/" + level + "/" + row + "/" + col;
								urlRequest.push(url);
								if (urlRequest.length == this.numberOfRequests || i == cells.length-1) {
									
									var promiseDownloadTiles = this.downloadTiles( urlRequest, mapManager );
									promiseDownloadTiles.then( function () {	
										self.getAllTilesFromServer( cells, ++i, deferred, [], mapManager );
									} ).otherwise(lang.hitch(this, function(error){
										deferred.reject(error);
									}));
								} else {
									self.getAllTilesFromServer( cells, ++i, deferred, urlRequest, mapManager );
								}
								
								
							} else {
								deferred.resolve();
							}

						},

						downloadTiles : function ( urlArray, mapManager ) {
							/* download the tile */
							var deferred = new Deferred();
							var offlineId = this.offlineAreaId;

							var self = this;
							var count = 0;
							array.forEach( urlArray, lang.hitch( this, function ( url ) {
								
								var tilePromise = self.maximoSpatialStore.getTileByOfflineAreaIdAndURL(offlineId, url);
								tilePromise.then(lang.hitch(this, function(tiles) {
									if (tiles.length == 0) {
										CommunicationManager.checkConnectivityAvailable().then(lang.hitch(this, function (isConnectionAvailable) {
									        if (isConnectionAvailable) {
									        	
									        	if (this.proxyHelper.isMobileFirstProxyEnabled()) {
									        		url = this.proxyHelper.removeProxyURL(url);
													var adapterPromise = this.proxyHelper.useImgAdapterProxy( url, mapManager );
													adapterPromise.then(lang.hitch(this, function(result) {						
														if (result.status == 200 && result.responseText) {
																count++;
																var img = result.responseText;
																url = this.proxyHelper.includeProxyURLIfEnabled( url, mapManager );
																self.maximoSpatialStore.addTile( url, img, offlineId );
																if (count >= urlArray.length) {
																	deferred.resolve();
																}
														} else {
															console.log( "xhr failed for "+ url );
															deferred.reject({error: "downloadInterrupted"});
														}
													}));
												} else {
													var req = new XMLHttpRequest();
													req.open( "GET", url, true );
													req.overrideMimeType( "text/plain; charset=x-user-defined" ); // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest?redirectlocale=en-US&redirectslug=DOM%2FXMLHttpRequest%2FUsing_XMLHttpRequest#Handling_binary_data

													req.onload = function () {
														if ( req.status === 200 && req.responseText !== "" ) {
															count++;
															
															var img = self._wordToBase64( self._stringToWord( this.responseText ) );
															
															self.maximoSpatialStore.addTile( url, img, offlineId );
															
															if (count >= urlArray.length) {
																deferred.resolve();
															}
														} else {
															console.log( "xhr failed for "+ url );
															deferred.reject({error: "downloadInterrupted"});
														}
													};
													req.onerror = function ( e ) {
														console.log( "xhr failed for "+ url );
														deferred.reject({error: "downloadInterrupted"});
													};
													req.send( null );
												}
									        	
									        	
									        }
									        else {
									        	deferred.reject({error: "downloadInterrupted"});						
									        }
									    }));
									} else {
										count++;
										this.logEvent("Tile already saved, skipping it "+ url);
										if (count >= urlArray.length) {
											deferred.resolve();
										}
									}
									
														
								}));
							} ) );

							return deferred.promise;
						},
						
						downloadSingleTile : function ( url ) {
							/* download the tile */
							var deferred = new Deferred();
							var offlineId = this.offlineAreaId;

							var self = this;
							var req = new XMLHttpRequest();
							req.open( "GET", url, true );
							req.overrideMimeType( "text/plain; charset=x-user-defined" ); // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest?redirectlocale=en-US&redirectslug=DOM%2FXMLHttpRequest%2FUsing_XMLHttpRequest#Handling_binary_data

							req.onload = function () {
								if ( req.status === 200 && req.responseText !== "" ) {
									var img = self._wordToBase64( self._stringToWord( this.responseText ) );
									
									self.maximoSpatialStore.addTile( url, img, offlineId );
									deferred.resolve();
								} else {
									console.log( "xhr failed for", url );
									deferred.reject();
								}
							};
							req.onerror = function ( e ) {
								console.log( "xhr failed for", url );
								deferred.reject();
							};
							req.send( null );

							return deferred.promise;
						},

						getContainingTileCoords : function ( point, res ) {
							var x = Math.max( Math.floor( ( point[ 0 ] - this.tileOrigin.x ) / ( this.tileSize.w * res ) ), 0 );
							var y = Math.max( Math.floor( ( this.tileOrigin.y - point[ 1 ] ) / ( this.tileSize.h * res ) ), 0 );
							return {
								x : x,
								y : y
							};
						},

						_wordToBase64 : function ( /* word[] */wa ) {
							// summary:
							// convert an array of words to base64 encoding, should be more efficient
							// than using dojox.encoding.base64
							var p = "=", tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = [];
							for ( var i = 0, l = wa.length * 4; i < l; i += 3 ) {
								var t = ( ( ( wa[ i >> 2 ] >> 8 * ( i % 4 ) ) & 0xFF ) << 16 ) | ( ( ( wa[ i + 1 >> 2 ] >> 8 * ( ( i + 1 ) % 4 ) ) & 0xFF ) << 8 ) | ( ( wa[ i + 2 >> 2 ] >> 8 * ( ( i + 2 ) % 4 ) ) & 0xFF );
								for ( var j = 0; j < 4; j++ ) {
									if ( i * 8 + j * 6 > wa.length * 32 ) {
										s.push( p );
									} else {
										s.push( tab.charAt( ( t >> 6 * ( 3 - j ) ) & 0x3F ) );
									}
								}
							}
							return s.join( "" );
						},

						_stringToWord : function ( /* string */s ) {
							// summary:
							// convert a string to a word array

							// word-based conversion method, for efficiency sake;
							// most digests operate on words, and this should be faster
							// than the encoding version (which works on bytes).
							var chrsz = 8; // 16 for Unicode
							var mask = ( 1 << chrsz ) - 1;

							var wa = [];
							for ( var i = 0, l = s.length * chrsz; i < l; i += chrsz ) {
								wa[ i >> 5 ] |= ( s.charCodeAt( i / chrsz ) & mask ) << ( i % 32 );
							}
							return wa; // word[]

						},

						parseTileInfo : function ( jsonMapServer ) {
							var resultObj = JSON.parse( jsonMapServer );

							this.tileInfo = resultObj.tileInfo;

							// set start/end column/row for LODS

							this.tileSize = {
								w : resultObj.tileInfo.cols,
								h : resultObj.tileInfo.rows
							};

							// set tile origin point in xy
							this.tileOrigin = resultObj.tileInfo.origin;
							// set topleft and bottomright points
							var upperLeft = ol.extent.getTopLeft( [
									resultObj.fullExtent.xmin, resultObj.fullExtent.ymin, resultObj.fullExtent.xmax, resultObj.fullExtent.ymax
							] );
							var bottomRight = ol.extent.getBottomRight( [
									resultObj.fullExtent.xmin, resultObj.fullExtent.ymin, resultObj.fullExtent.xmax, resultObj.fullExtent.ymax
							] );

							var lods = [];
							for ( var key in resultObj.tileInfo.lods ) {
								if ( resultObj.tileInfo.lods.hasOwnProperty( key ) ) {
									var lod = resultObj.tileInfo.lods[ key ];

									var start = this.getContainingTileCoords( upperLeft, lod.resolution );
									lod.startTileCol = start.x;
									lod.startTileRow = start.y;

									var end = this.getContainingTileCoords( bottomRight, lod.resolution );
									lod.endTileCol = end.x;
									lod.endTileRow = end.y;
									lods.push( lod );
								}
							}

							this.tileInfo.lods = lods;

						},

						getTileUrl : function ( lookupURL, offlineAreasLoaded ) {
							var deferred = new Deferred();
							this.maximoSpatialStore.findTileImg( lookupURL, offlineAreasLoaded ).then(function(tile) {
								var img = null;
								if (tile && tile[0] && tile[0].json && tile[0].json.img) {
									var img = tile[0].json.img;
									if (img.indexOf("data:image") == -1) {
										img = "data:image/png;base64," + img;
									}	
								} else {
									console.log("tile is not in the offline store", lookupURL);
									img = "data:image/png;base64,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pmk0TROPj48Hn3l4eIimaSJN06O3A4NJwDMxm82ibdtXo4D5fB6r1Sp+//4dz8/Pw5H+6ekpdrtdJEkS8/n8S/9f713ie3vaceo9x557QAB451Sgfyin34HKshweunk5HzAej2MymXz5+f9nbjJyI9L39Wu5XP55+XQZ39uxR4Z3u90wSXjqEV0wAjhjx47oaZq63Me/ZhIQBAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEAAbAJQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEAvqe/BwCeKjUweoA8pQAAAABJRU5ErkJggg==";
								}																
								deferred.resolve(img);
							});

							
							return deferred.promise;
						},
						
						loadTilesIntoStore: function(layerBasemap, boundingExtend, initZoom, finalZoom, offlineAreaSelected, mapManager) {
							var deferred = new Deferred();
							this.createTileCache( layerBasemap, boundingExtend, initZoom, finalZoom, offlineAreaSelected );
							this.getAllTiles(mapManager).then( lang.hitch(this, function () {
								deferred.resolve();
							} ) ).otherwise(lang.hitch(this, function(error){
								
								deferred.reject(error);
							}));
							return deferred.promise;
						},
						
						logEvent: function(msg) {
							Logger.trace(msg);
							console.log(msg);
						},

					} );
		} );
