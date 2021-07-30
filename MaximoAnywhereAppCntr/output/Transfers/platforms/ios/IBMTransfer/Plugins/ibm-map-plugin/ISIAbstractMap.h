//
//  ISIAbstractMap.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 3/18/14.
//
//

#import <Foundation/Foundation.h>
#import <ArcGIS/ArcGIS.h>
#import "ISILayerInfo.h"

@interface ISIAbstractMap : NSObject

@property (strong, readonly) AGSMapView *mapView;
@property (readonly) UIWebView *webView;

// types of map we support
typedef enum {
    esri
} MapType;
@property MapType mapType;

//protected List<RoutingListener> routingListeners;

@property NSString *providerUrl;
// in java this is a jsonObject, it must be converted using NSJSONSerialization into NSDictionary
@property NSDictionary *specificParameters;


// layerIds for Dale/Chip to retrieve and do some manipulation when needed
// maps the <String externalLayerId, LayerInfo> see LayerInfo for more details
@property NSMutableDictionary *layersInfo;


//// directions cache
//protected HashMap<String, String> directionsCache;
// generic cache, the way it was stored it is retrieved
@property (readonly) NSDictionary *cache;

-(id) initWithMapView:(AGSMapView *)mapView webView:(UIWebView*)webView providerUrl:(NSString *)providerUrl jsonObject:(NSDictionary *) specificParameters;
+(id) abstractMapWithMapView:(AGSMapView *)mapView webView:(UIWebView*)webView providerUrl:(NSString *)providerUrl jsonObject:(NSDictionary *) specificParameters;

/**
 * Initializes the map in such a way that from this point on all the
 * events are being handled and map is ready to be shown
 * lk0 - need to create a new name for this?
 */
//-(void) init;

/**
 * Hide all user layers (only don't hide the map layer it self)
 */
-(void) hideLayers;

/**
 * Show all layers
 */
-(void) showLayers;

/**
 * Set a cache for the current state, only one cache can be set
 * such cache is going to be stored on the JS side (jsonStore) automatically
 *
 * @param jsonObject
 * lk0, later
 */
-(void) setCache:(NSDictionary*) jsonObject;

/**
 *
 * @return the cache stored on JS side (jsonStore)
 * lk0, later
 */
-(NSDictionary*) getCache;
//public JSONObject getCache() {
//    return cache;
//}

/**
 * Before using setCache ensure you prepare the cache to follow the standards and be able to be retrieved
 *
 * @param jsonObject
 * @param cacheId
 * @return a cache ready to be set using setCache or null if something fails
 * lk0, later
 */
+(NSDictionary*) prepareCache:(NSDictionary*)jsonObject cacheId:(NSString*) cacheId;

/**
 * generateUUID to be used within the cache
 *
 * @param jsonArray - resources
 * @return - String with the UUID
 * lk0, later
 */
+(NSString*)generateUUID:(NSArray*)jsonArray;

/**
 * TODO, this is not yet a generic (for maximo and tririga) solution due to Defect 84068
 *
 * Load jsonObjects data from intent into markers (graphs) and add those into the Graphic layer
 * it expects that one of the jsonObjects properties is:
 *
 *   {
 *   	serviceaddress: {
 *   		max:latitudey,
 *   		max:longitudex
 *   	}
 *   }
 *
 * @param jsonArray - jsonArray containing the jsonObjects mentioned above
 * @param externalLayerId - an id that Dale/Chip can create to manage on the js side
 */
-(void) addLayer:(NSArray*) jsonArray layerId:(NSString*) externalLayerId resourceIndex: (NSInteger) resourceIndex;

// lk0, later
//-(void) setGPSLocation:(NSArray*) jsonArray;

/**
 * Remove all markers from the map
 */
-(void) removeAllLayers;

/**
 * Remove a specific layer (and all its markers) from the map
 *
 * use layerIds.get(long) to find which layerId Dale/Chip defined
 */
-(void) removeLayer:(NSString*) externalLayerId;

-(UIWebView*) getWebView;

+(NSString*) mapTypeToString:(MapType) type;
+(MapType) stringToMapType:(NSString*) string;


/**
 * Get all legs (all directions) from a given layerId
 *
 * @param externalLayerId define which layer should get routing directions, all
 * markers on such layer are considered on the routing. This layerId is created on JS
 * side within addLayer method
 *
 * @return an array of a specific type containing driving directions and additional details,
 * notice that it actually returns a promise of type Directions, but on the MapPlugin side
 * it returns only the Directions to the JS side
 * lk0, later
 */
//public abstract Promise<Directions> getAllDirections(String externalLayerId);

/**
 * Get legs (directions) for a single marker that matches the query criteria
 *
 * @param externalLayerId define which layer should get routing directions, all
 * markers on such layer are considered on the routing. This layerId is created on JS
 * side within addLayer method
 * @param query a JSONObject to be used to match specific marker date, for example, if you
 * have a marker which contains wonum=1330 receiving a query { wonum: 1330 } would get the
 * directions for that specific marker towards to the next marker
 * lk0, later
 * @return
 */
//public abstract DirectionsLeg getDirections(String externalLayerId, JSONObject query);

/**
 * Set a specific marker as selected, this also causes the marker to enlarge
 * indicating it was selected
 *
 * @param externalLayerId an id that Dale/Chip can create to manage on the js side
 * @param query i.e. { wonum: 1132 }
 * @return MarkerInfo
 * lk0, later
 */
//public abstract MarkerInfo setMarkerSelected(String externalLayerId, JSONObject query);

/**
 * Whenever an event on routing occur after requestRouting this method
 * should be called to send events back to JS
 * lk0, later
 */
//protected void onRouting(RoutingEvent<?> routingEvent) {
//    for(RoutingListener listener : routingListeners) {
//        listener.onRouting(routingEvent);
//    }
//}

/**
 * @param routingListener
 * lk0, later
 */
//protected void addRoutingListener(RoutingListener routingListener) {
//    routingListeners.add(routingListener);
//}

/**
 * @param routingListener
 * lk0, later
 */
//protected void removeRoutingListener(RoutingListener routingListener) {
//    routingListeners.remove(routingListener);
//}


/**
 * @param externalLayerId
 * @return an array of resourceIndexes for the markers of the externalLayerId
 * lk0, later
 */
//public abstract Integer[] getResourceIndexesFromMarkers(String externalLayerId);

/**
 * lk0, later
 */
//public abstract void sendMapProperties(JSONArray jsonArray);

@end
