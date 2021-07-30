/*
 COPYRIGHT 2011 ESRI
 
 TRADE SECRETS: ESRI PROPRIETARY AND CONFIDENTIAL
 Unpublished material - all rights reserved under the
 Copyright Laws of the United States and applicable international
 laws, treaties, and conventions.
 
 For additional information, contact:
 Environmental Systems Research Institute, Inc.
 Attn: Contracts and Legal Services Department
 380 New York Street
 Redlands, California, 92373
 USA
 
 email: contracts@esri.com
 */


@class AGSMapView;
@protocol AGSWebMapDelegate;
@class AGSWebMapBaseMap;
@class AGSPortalItem;
@class AGSPopupInfo;
@class AGSPortal;
@class AGSPortalItem;
@class AGSWebMapLayerInfo;
@class AGSLayer;
@class AGSCredential;
@class AGSDynamicMapServiceLayer;
@class AGSTiledMapServiceLayer;
@class AGSFeatureLayer;
@class AGSQuery;
@class AGSWebMapSubLayerInfo;
@class AGSEnvelope;

/** Notification name that indicates that an @c AGSWebMap successfully loaded.
 @agssince{10.2, 10.2}
 */
AGS_EXTERN NSString *const AGSWebMapDidLoadNotification;

/** Notification name that indicates that an @c AGSWebMap failed to load.
 @agssince{10.2, 10.2}
 */
AGS_EXTERN NSString *const AGSWebMapDidFailToLoadNotification;

/** Notification name that indicates that the webmap was opened into an @c AGSMapView.
 @agssince{10.2, 10.2}
 */
AGS_EXTERN NSString *const AGSWebMapDidOpenIntoMapViewNotification;

/** Notification name that indicates that an @c AGSWebMap fetched popups for a layer.
 @agssince{10.2, 10.2}
 */
AGS_EXTERN NSString *const AGSWebMapDidFetchPopupsNotification;

/** Notification name that indicates that an @c AGSWebMap is done fetching popups.
 @agssince{10.2, 10.2}
 */
AGS_EXTERN NSString *const AGSWebMapDidFinishFetchingPopupsNotification;

/** @file AGSWebMap.h */ //Required for Globals API doc

/** @brief An object representing a webmap
 
 Instances of this class represent a webmap. A webmap is essentially a simple configuration
 file that describes the contents to be displayed in a map. You can use, create, and share webmaps
 interactively on www.ArcGIS.com or your own ArcGIS Portal.   

 Instantiating an object of @c AGSWebMap loads the webmap by retrieving its data from a server. To view the contents 
 of the webmap, you need to open it using @c #openIntoMapView:
 
 The webmap's #delegate is kept informed whenver operations performed by the webmap complete successfully or encounter an error.
 For exmaple, as each layer in the webmap is loaded successfully, the delegate is informed. If any layers fail to load, 
 the delegate is given an opportunity to skip to the next layer, or re-try loading the current layer with proper 
 credentials if the layer was using a secured service. If the webmap contains a Bing Maps layer, the delegate is asked 
 to provide a valid Bing Maps app ID to use with that layer. 
 
 Note, you should always open a webmap into a
 map view on the main thread.
 @see @concept{viewing-web-map.htm, Viewing a Web Map}
 @see @sample{d76ed99f71e24116b324ff624a194ef9, Web Map Sample}
 @see @sample{17a21ac9f847472b84bcda8c66f942c8, Web Map Popup Sample}
 
 

 @agssince{1.8, 10.2}
 */
@interface AGSWebMap : NSObject <AGSCoding, AGSSecuredResource>

/** Initializes a webmap. The @c #delegate will be informed when the webmap data is successfully retrieved from the server
 or if an error is encountered.
 @param url where the webmap's data can be accessed. 
 For example, http://&lt;my_arcgis_portal&gt;/sharing/rest/content/items/<web_map_id>/data
 @param cred The credential to access the webmap.
 @agssince{2.0, 10.2}
 @see @c AGSWebMapDelegate#webMapDidLoad: , method on delegate for success
 @see @c AGSWebMapDelegate#webMap:didFailToLoadWithError: , method on delegate for error
 */
-(id)initWithURL:(NSURL *)url credential:(AGSCredential*)cred;

/** Returns an autoreleased webmap. The @c #delegate will be informed when the webmap data is successfully retrieved from the server
 or if an error is encountered.
 @param url where the webmap's data can be accessed. 
 For example, http://&lt;my_arcgis_portal&gt;/sharing/rest/content/items/<web_map_id>/data
 @param cred The credential to access the webmap.
 @agssince{2.0, 10.2}
 @see @c AGSWebMapDelegate#webMapDidLoad: , method on delegate for success
 @see @c AGSWebMapDelegate#webMap:didFailToLoadWithError: , method on delegate for error
 */
+(AGSWebMap*)webMapWithURL:(NSURL *)url credential:(AGSCredential*)cred;

/** Returns an autoreleased webmap. The @c #delegate will be informed when the webmap data is successfully retrieved from the server
 or if an error is encountered.
 @param itemId The item id of the webmap on ArcGIS.com
 @param cred The credential to access the webmap.
 @agssince{2.0, 10.2}
 @see @c AGSWebMapDelegate#webMapDidLoad: , method on delegate for success
 @see @c AGSWebMapDelegate#webMap:didFailToLoadWithError: , method on delegate for error
*/
+(AGSWebMap*)webMapWithItemId:(NSString*)itemId credential:(AGSCredential*)cred;

/** Initializes a webmap. The @c #delegate will be informed when the webmap data is successfully retrieved from the server
 or if an error is encountered.
 @param itemId The item id of the webmap on ArcGIS.com
 @param cred The credential to access the webmap.
 @agssince{2.0, 10.2}
 @see @c AGSWebMapDelegate#webMapDidLoad: , method on delegate for success
 @see @c AGSWebMapDelegate#webMap:didFailToLoadWithError: , method on delegate for error
*/
-(id)initWithItemId:(NSString*)itemId credential:(AGSCredential*)cred;

/** Returns an autoreleased webmap. The @c #delegate will be informed when the webmap data is successfully retrieved from the server
 or if an error is encountered.
 @param itemId The item id of the webmap.
 @param sharingEndPoint The sharing endpoint of the portal where the webmap is stored. 
 For example, http://&lt;my_arcgis_portal&gt;/sharing/rest . Can be nil, in which case it is assumed the webmap is
 stored on ArcGIS.com.
 @param cred The credential to access the webmap.
 @agssince{2.0, 10.2}
 @see @c AGSWebMapDelegate#webMapDidLoad: , method on delegate for success
 @see @c AGSWebMapDelegate#webMap:didFailToLoadWithError: , method on delegate for error
 */
+(AGSWebMap*)webMapWithItemId:(NSString*)itemId sharingEndPoint:(NSURL*)sharingEndPoint credential:(AGSCredential*)cred;

/** Initializes a webmap. The @c #delegate will be informed when the webmap data is successfully retrieved from the server
 or if an error is encountered.
 @param itemId The item id of the webmap.
 @param sharingEndPoint The sharing endpoint of the portal where the webmap is stored. 
 For example, http://&lt;my_arcgis_portal&gt;/sharing/rest . Can be nil, in which case it is assumed the webmap is
 stored on ArcGIS.com.
 @param cred The credential to access the webmap.
 @agssince{2.0, 10.2}
 @see @c AGSWebMapDelegate#webMapDidLoad: , method on delegate for success
 @see @c AGSWebMapDelegate#webMap:didFailToLoadWithError: , method on delegate for error
 */
-(id)initWithItemId:(NSString*)itemId sharingEndPoint:(NSURL*)sharingEndPoint credential:(AGSCredential*)cred;

/** Initializes a webmap based on the given portal item.
 The @c #delegate will be informed when the webmap's data is successfully retrieved from the server
 or if an error is encountered.
 
 @param item The webmap. The @c AGSPortalItem#type must be @c AGSPortalItemTypeWebMap. 
 @agssince{2.2, 10.2}
 @see @c AGSWebMapDelegate#webMapDidLoad: , method on delegate for success
 @see @c AGSWebMapDelegate#webMap:didFailToLoadWithError: , method on delegate for error
 */
-(id)initWithPortalItem:(AGSPortalItem*)item;

/** Returns an autoreleased webmap based on the given portal item.

 The @c #delegate will be informed when the webmap data is successfully retrieved from the server
 or if an error is encountered.
 @param item The webmap. The @c AGSPortalItem#type must be @c AGSPortalItemTypeWebMap.
 @agssince{2.2, 10.2}
 @see @c AGSWebMapDelegate#webMapDidLoad: , method on delegate for success
 @see @c AGSWebMapDelegate#webMap:didFailToLoadWithError: , method on delegate for error
 */
+(AGSWebMap*)webMapWithPortalItem:(AGSPortalItem*)item;

/** Returns an autoreleased webmap based on the given portal and itemId.
 
 The @c #delegate will be informed when the webmap data is successfully retrieved from the server
 or if an error is encountered.
 @param itemId The id of the webmap
 @param portal The portal where the item resides
 @agssince{2.2, 10.2}
 @see @c AGSWebMapDelegate#webMapDidLoad: , method on delegate for success
 @see @c AGSWebMapDelegate#webMap:didFailToLoadWithError: , method on delegate for error
*/
+(AGSWebMap*)webMapWithItemId:(NSString*)itemId portal:(AGSPortal*)portal;

/** Initializes a webmap based on the given portal and itemId.
 
 The @c #delegate will be informed when the webmap data is successfully retrieved from the server
 or if an error is encountered.
 @param itemId The id of the webmap
 @param portal The portal where the item resides
 @agssince{2.2, 10.2}
 @see @c AGSWebMapDelegate#webMapDidLoad: , method on delegate for success
 @see @c AGSWebMapDelegate#webMap:didFailToLoadWithError: , method on delegate for error
*/
-(id)initWithItemId:(NSString*)itemId portal:(AGSPortal*)portal;

/** The URL where the webmap's data can be accessed from.
 For example, http://&lt;my_arcgis_portal&gt;/sharing/content/items/&lt;web_map_id&gt;/data
 @agssince{1.8, 10.2}
 */
@property (nonatomic, copy, readwrite) NSURL *URL;

/** Credential used to access a secured resource
 @agssince{1.8, 10.2}
 */
@property (nonatomic, copy, readwrite) AGSCredential *credential;

/** The credential cache to be used for this resource. If a web map is instantiated with an AGSPortal or AGSPortalItem
 it will get the credentail cache from there, otherwise it will create it's own credential cache.
 @agssince{10.1.1, 10.2}
 */
@property (nonatomic, strong, readwrite) AGSCredentialCache *credentialCache;

/** The delegate for the webmap.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, weak) id<AGSWebMapDelegate> delegate;

/** Determines whether the webmap zooms to the default webmap extent
 when it is opened into a mapview.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, assign) BOOL zoomToDefaultExtentOnOpen;

/** The bookmarks that this AGSWebMap contains.
 @agssince{2.0, 10.2}
 */
@property (nonatomic, copy, readwrite) NSArray *bookmarks;

/** Whether or not the webmap is loaded.
 @agssince{2.0, 10.2}
 */
@property (nonatomic, readonly, getter=isLoaded) BOOL loaded;

/** This webmap's version information.
 @agssince{2.2, 10.2}
 */
@property (nonatomic, readonly) CGFloat version;

/** An array of @c AGSWebMapLayerInfo objects representing the operational layers in this webmap.
 @agssince{2.2, 10.2}
 */
@property (nonatomic, copy, readwrite) NSArray *operationalLayers;

/** The basemap layer(s) in this webmap.
 @agssince{2.2, 10.2}
 */
@property (nonatomic, strong, readwrite) AGSWebMapBaseMap *baseMap;

/** An instance of @c AGSPortalItem class representing this webmap. 
 @agssince{2.2, 10.2}
 */
@property (nonatomic, strong, readonly) AGSPortalItem *portalItem;

/** An array of @c AGSWebMapQuery objects representing the predefined queries that were authored with this webmap.
 @agssince{2.2, 10.2}
 */
@property (nonatomic, copy, readwrite) NSArray *queries;

/** The @c AGSMapView, if any, that the this @c AGSWebMap has been opened up into or is currently opening into.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, strong, readonly) AGSMapView *mapView;

/** Whether the WebMap is currently being opened into an @c AGSMapView.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, readonly) BOOL isOpening;

/** Starts opening a webmap into an AGSMapView. This method must be called on the main thread.
 The mapview will be reset (through AGSMapView#reset ) before opening the webmap.
 @param mapView The mapView to open the webmap into.
 @agssince{1.8, 10.2}
 @see @c AGSWebMapDelegate#didOpenWebMap:intoMapView: , delegate method when webmap finishes opening
 @see @c AGSWebMapDelegate#webMap:didLoadLayer: , delegate method when a layer in webmap loads successfully
 @see @c AGSWebMapDelegate#webMap:didFailToLoadLayer:baseLayer:federated:withError: , delegate method when a layer in webmap fails to loads 
 */
-(void)openIntoMapView:(AGSMapView*)mapView;

/** Starts opening a webmap into an AGSMapView.
 @param mapView The mapView to open the webmap into.
 @param baseMap The alternate base map to use for opening the webmap. Can pass nil for this parameter,
 in which case it will use the default basemap.
 @agssince{2.2, 10.2}
 @see @c AGSWebMapDelegate#didOpenWebMap:intoMapView: , delegate method when webmap finishes opening
 @see @c AGSWebMapDelegate#webMap:didLoadLayer: , delegate method when a layer in webmap loads successfully
 @see @c AGSWebMapDelegate#webMap:didFailToLoadLayer:baseLayer:federated:withError: , delegate method when a layer in webmap fails to loads
 */
-(void)openIntoMapView:(AGSMapView*)mapView withAlternateBaseMap:(AGSWebMapBaseMap*)baseMap;

/** Starts opening a webmap into an AGSMapView. The other openIntoMapView methods all reset the AGSMapView
 before-hand. This method gives you the option of overriding that behavior. This is useful if you have your own
 basemap layers and you want to open the AGSWebMap over those layers. If you want to add only the operational layers
 (skipping the basemap layers), you can pass in an empty AGSWebMapBaseMap for the baseMap parameter. To get an empty
 AGSWebMapBaseMap you simply alloc and init it.
 @param mapView The mapView to open the webmap into.
 @param baseMap The alternate base map to use for opening the webmap. Can pass nil for this parameter,
 in which case it will use the default basemap.
 @param reset Whether or not you want this method to reset the AGSMapView before it starts opening the AGSWebMap.
 @agssince{2.2, 10.2}
 @see @c AGSWebMapDelegate#didOpenWebMap:intoMapView: , delegate method when webmap finishes opening
 @see @c AGSWebMapDelegate#webMap:didLoadLayer: , delegate method when a layer in webmap loads successfully
 @see @c AGSWebMapDelegate#webMap:didFailToLoadLayer:baseLayer:federated:withError: , delegate method when a layer in webmap fails to loads
 */
-(void)openIntoMapView:(AGSMapView*)mapView withAlternateBaseMap:(AGSWebMapBaseMap *)baseMap resetMapView:(BOOL)reset;

/** Continues opening the current layer with a credential.
 @agssince{1.8, 10.2}
 */
-(void)continueOpenWithCredential:(AGSCredential*)credential;

/** Continues opening the webmap and skips the current layer that failed.
 @agssince{1.8, 10.2}
 */
-(void)continueOpenAndSkipCurrentLayer;

/** Cancels opening the webmap.
 @agssince{1.8, 10.2}
 */
-(void)cancelOpen;

/**
 Once you've opened a webmap into a map view, you can switch out the basemap without re-opening
 the entire map. If you haven't opened the webmap into a mapview then this method will do nothing.
 If the webmap is currently opening, this method does nothing. If this webmap is currently switching basemaps
 then it will cancel that and switch to the last one passed in.
 When switching basemaps, the
 delegate methods regarding layer loading are called. For example if a basemap layer fails to load it will
 call @c AGSWebMapDelegate#webMap:didFailToLoadLayer:baseLayer:federated:withError:.
 If a layer fails to load, you can call @c #continueOpenWithCredential:,  @c #continueOpenAndSkipCurrentLayer, or  @c #cancelOpen.
 Once the webmap has tried to load all the basemap layers and add them to the map then the delegate
 method @c AGSWebMapDelegate#webMap:didSwitchBaseMap:onMapView: is called.
 @since 10.2.3
 */
-(void)switchBaseMapOnMapView:(AGSWebMapBaseMap*)basemap;

/** Whether the WebMap is currently being opened into an @c AGSMapView.
 @since 10.2.3
 */
@property (nonatomic, readonly) BOOL isSwitchingBaseMap;

/** Returns the AGSPopupInfo that is associated with the layer of a particular url.
 This method does not create a new AGSPopupInfo. It returns a reference to an existing AGSPopupInfo.
 @agssince{2.0, 10.2}
 */
-(AGSPopupInfo*)popupInfoForMapServiceLayerWithURL:(NSURL*)url sublayerId:(NSInteger)sublayerId;

/** Returns the AGSPopupInfo that is associated with the AGSDynamicMapSerciceLayer.
 This method does not create a new AGSPopupInfo. It returns a reference to an existing AGSPopupInfo.
 @agssince{2.0, 10.2}
 */
-(AGSPopupInfo*)popupInfoForDynamicMapServiceLayer:(AGSDynamicMapServiceLayer*)dmsl sublayerId:(NSInteger)sublayerId;

/** Returns the AGSPopupInfo that is associated with the AGSTiledMapServiceLayer.
 This method does not create a new AGSPopupInfo. It returns a reference to an existing AGSPopupInfo.
 @agssince{2.0, 10.2}
 */
-(AGSPopupInfo*)popupInfoForTiledMapServiceLayer:(AGSTiledMapServiceLayer*)tmsl sublayerId:(NSInteger)sublayerId;

/** Returns the AGSPopupInfo that is associated with the AGSFeatureLayer.
 This method does not create a new AGSPopupInfo. It returns a reference to an existing AGSPopupInfo.
 @agssince{2.0, 10.2}
 */
-(AGSPopupInfo*)popupInfoForFeatureLayer:(AGSFeatureLayer*)featureLayer;

/** A convenience method to return information in the webmap for a given layer/sub-layer as an @c AGSWebMapLayerInfo objects 
 @agssince{10.1.1, 10.2}
 */
-(AGSWebMapLayerInfo*)webMapLayerInfoForLayer:(AGSLayer*)layer subLayerInfo:(AGSWebMapSubLayerInfo**)subLayerInfo;

/** Kicks off an operation to fetch popups.
 The returns value indicates whether or not popups are going to be fetched.
 This will automatically cancel all the previous fetch operations.
 Had to have opened a webmap into a mapview for this method to work.
 @see @c AGSWebMapDelegate#webMap:didFetchPopups:forExtent: , delegate method when popups are being fetched. May be called multiple time 
 @see @c AGSWebMapDelegate#webMap:didFinishFetchingPopupsForExtent: , delegate method when all popups have been fetched. 
 @see @c #cancelFetchPopups to cancel any outstanding operations
 @agssince{10.2, 10.2}
 */
-(BOOL)fetchPopupsForExtent:(AGSEnvelope*)extent;

/** Cancels any outstanding operations to fetch popups.
 @agssince{10.2, 10.2}
 */
-(void)cancelFetchPopups;

/** Indicates if there are any popups defined on any layer in this webmap.
 The webmap must have been opened into a map view before any popups can be discovered.
 Wait for the @c AGSWebMapDelegate#didOpenWebMap:intoMapView: delegate method to fire before you use this method.
  @agssince{10.2, 10.2}
 */
-(BOOL)hasPopupsDefined;

/**
 This method will nil out references to the mapview and layers. It is useful if you no longer want the webmap
 to retain the layers and mapview, but you need to keep the webmap around for state purposes.
 @since 10.2.3
 */
-(void)unbindFromMapView;

@end


/** @brief A delegate of @c AGSWebMap
 
 A protocol which must be adopted by a class wishing to serve as a delegate for 
 @c AGSWebMap.  An instance of the
 class must then be set as @c AGSWebMap#delegate .

 
 @c AGSWebMap informs the delegate of events and consults the
 delegate before taking some action. 
 
 All of the methods of this protocol are optional.
 @agssince{1.8, 10.2}
 */
@protocol AGSWebMapDelegate <NSObject>
@optional

/** Tells the delegate that the webmap data was retrieved successfully.
 @param webMap The webmap that was loaded.
 @agssince{2.0, 10.2}
 */
- (void)webMapDidLoad:(AGSWebMap *)webMap;

/** Tells the delegate that the specified @p error was encountered while tyring to retrieve the webmap's data.
 @param webMap The webmap that failed to load.
 @param error Information about the cause of the failure.
 @agssince{2.0, 10.2}
 */
- (void)webMap:(AGSWebMap *)webMap didFailToLoadWithError:(NSError *)error;

/** Called when the webmap is done switching the basemap.
 @since 10.2.3
 */
-(void)webMap:(AGSWebMap*)webMap didSwitchBaseMap:(AGSWebMapBaseMap*)baseMap onMapView:(AGSMapView*)mapView;

/** Called when a webmap is done opening into an AGSMapView.
 @param webMap The web map that was successfully opened.
 @param mapView The map view in which the web map was opened into.
 @agssince{1.8, 10.2}
 */
-(void)didOpenWebMap:(AGSWebMap*)webMap intoMapView:(AGSMapView*)mapView;

/** Called when a layer fails to load. The delegate can either
 skip loading the layer using @c AGSWebMap#continueOpenAndSkipCurrentLayer method or retry loading it with credentials
 using @c AGSWebMap#continueOpenWithCredential: method 
 @param layerTitle The title of the layer being loaded.
 @param url The url of the layer being loaded.
 @param baseLayer Whether or not the layer is part of the basemap layers.
 @param error The error describing why the layer failed to load.
 @agssince{2.1, 10.2}
 @deprecated Deprecated at 10.1.1. Use @c AGSWebMap#webMap:didFailToLoadLayer:baseLayer:federated:withError: instead.
 */
-(void)didFailToLoadLayer:(NSString*)layerTitle url:(NSURL*)url baseLayer:(BOOL)baseLayer withError:(NSError*)error __attribute__((deprecated));

/** Called when a layer fails to load. The delegate can either
 skip loading the layer using @c AGSWebMap#continueOpenAndSkipCurrentLayer method or retry loading it with credentials
 using @c AGSWebMap#continueOpenWithCredential: methods
 @param webMap The webmap that was loaded
 @param layerInfo The @c AGSWebMapLayerInfo of the layer that failed to load.
 @param baseLayer Whether or not the layer is part of the basemap layers.
 @param federated Whether or not the layer is federated with the portal that the web map is in.
 @param error The error describing why the layer failed to load. 
 @agssince{10.1.1, 10.2}
 */
-(void)webMap:(AGSWebMap*)webMap didFailToLoadLayer:(AGSWebMapLayerInfo*)layerInfo baseLayer:(BOOL)baseLayer federated:(BOOL)federated withError:(NSError*)error;

/** Called when a layer loads.
 @param layer The layer that loaded successfully.
 @agssince{1.8, 10.2}
 @deprecated Deprecated at 10.1.1. Use @c AGSWebMap#webMap:didLoadLayer: instead. 
*/
-(void)didLoadLayer:(AGSLayer*)layer __attribute__((deprecated));

/** Called when a layer loads successfully.
 @param webMap The web map that the loaded layer belongs to.
 @param layer The layer that was successfully loaded.
 @agssince{10.1.1, 10.2}
 */
-(void)webMap:(AGSWebMap*)webMap didLoadLayer:(AGSLayer*)layer;

/** Called when the webmap needs to open a Bing layer.
 @agssince{1.8, 10.2}
 @deprecated Deprecated at 10.1.1. Use @c AGSWebMap#bingAppIdForWebMap: instead. 
 */
-(NSString*)bingAppId __attribute__((deprecated));

/** Called when the webmap needs to open a Bing layer.
 @agssince{10.1.1, 10.2}
 */
-(NSString*)bingAppIdForWebMap:(AGSWebMap*)webMap;

/** Called when a group of popups is retrieved. This method can be called multiple times until @c AGSWebMap#webMapDidFinishFetchingPopups: is called.
 @agssince{10.2, 10.2}
 */
-(void)webMap:(AGSWebMap*)webMap didFetchPopups:(NSArray*)popups forExtent:(AGSEnvelope*)extent;

/** Called when all the popups have been retrieved.
 @agssince{10.2, 10.2}
 */
-(void)webMap:(AGSWebMap*)webMap didFinishFetchingPopupsForExtent:(AGSEnvelope*)extent;

@end
