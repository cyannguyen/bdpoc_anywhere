//
//  ISIEsriMap.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 3/18/14. Updated by Fabio on 12/03/2015
//
//

#import <ArcGIS/ArcGIS.h>
#import "ISIAbstractMap.h"
#import "ISIEsriMapEventDispatcher.h"
#import "ISIMarkerModel.h"
#import "ISIPositionSorter.h"
#import "ISIMapProperties.h"
#import "ISIEsriRoutingService.h"
#import "ISIEsriPromiseRouteDelegator.h"
#import "ISIMarkerInfo.h"
#import "ISIDirectionsLeg.h"
#import "ISIDirections.h"
#import "ISINativeException.h"

@interface ISIEsriMap : ISIAbstractMap <ISIEsriPromiseRouteProtocol>

typedef enum ZoomStatus : NSInteger ZoomStatus;
enum ZoomStatus : NSInteger {CENTRALIZE, FIT, FITALL, USERMOVE, EMPTY };

@property ZoomStatus zoomStatus;
@property AGSPoint *currentSelectedPoint;
@property AGSPoint *gpsPoint;

@property (readonly) AGSTiledLayer *map;
@property (readonly) NSInteger mapIndex;

@property AGSGraphicsLayer *gpsLayer;
//private int gpsLayerIndex = 2;

//These variables are used on routes
@property UIColor *pathColor;
@property NSInteger pathThickness;

@property ISIMarkerModel *markerModel;
@property ISIMarkerModel *selectedMarkerModel;
@property ISIMarkerModel *gpsMarkerModel;

@property ISIMapProperties *mapProperties;

// Spatial reference to be used on the conversion
@property AGSSpatialReference *externalSpatialReference;


// Spatial reference to the current loaded map
@property AGSSpatialReference *mapSpatialReference;


//// this is the path to the exploded or not tpk file inside the device
//// TODO, epic 81357: Deliver offline maps to devices - have stories on how to make such tpk files available on the device
//private String localMapUrl;

// hold the map extend considering the incoming markers
@property (readonly) double xmin, ymin, xmax, ymax;

@property AGSEnvelope *extendEnvelope;

//// hold the related routing layer
@property NSMutableDictionary *relatedLayers;
//
//// TODO, this should be customizable by Chip/Dale
//SimpleLineSymbol pathSymbol = new SimpleLineSymbol(Color.BLUE, 3);
//
//// TODO, needs to be globalized based on the user language
//// also they should come from the constructor or grab from the webview, not sure yet
@property NSLocale *locale;
@property AGSSRUnit lengthUnit;

@property ISIEsriMapEventDispatcher *mapEventDispatcher;
@property (readonly) ISIPositionSorter *positionSorter;

//private EsriMapEventDispatcher mapEventDispatcher;
//
// 4326 refers to a Geodetic Coordinate Reference System (i.e. it uses latitude and longitude as coordinate units).
// It is made up of the WGS84 Geodetic Datum (EPSG:6326) and an ellipsoidal coordinate system (EPSG:6422).
// The datum itself is made up of the WGS84 ellipsoid, and a prime meridian.
// These are the Spatial Reference System components.

// *Google Earth is in a Geographic coordinate system with the wgs84 datum. (EPSG: 4326)
// *Google Maps is in a projected coordinate system that is based on the wgs84 datum. (EPSG 3857)
// *The data in Open Street Maps database is stored in a gcs with units decimal degrees & datum of wgs84. (EPSG: 4326)
// *The Open Street Map tiles and the WMS webservice, are in the projected coordinate system that is based on the wgs84 datum. (EPSG 3857)
// Spatial Reference 4326/WGS84 (lat/lng)
// It Is also assumed that the coordinate system that is coming in
// is also the same coordinate system as the embedded Esri map
@property (readonly) BOOL convertInputCoordinateTo4326;

@property NSString *currentLocationMessage;

//// holds the cache cacheid, it changes every time
@property NSString *currentCacheId;
//// last directions loaded are kept here
@property ISIDirections *cachedDirections;
@property (readonly) ISIEsriRoutingService *routingService;


-(id) initWithMapView:(AGSMapView *)mapView webView:(UIWebView*)webView providerUrl:(NSString *)providerUrl jsonObject:(NSDictionary *) specificParameters;
+(id) esriMapWithMapView:(AGSMapView *)mapView webView:(UIWebView*)webView providerUrl:(NSString *)providerUrl jsonObject:(NSDictionary *) specificParameters;
-(void) loadSpecificParameters:(NSDictionary*)specificParameters;
-(void) initialize;
-(AGSTiledLayer*) getTileLayer;
-(UIWebView*) getWebView;
-(void) adjustMarkerAnchor:(AGSPictureMarkerSymbol*) mapMarker;
-(void) sendMapProperties:(NSArray*) jsonArray;
-(void) setGPSLocation:(NSArray*) jsonArray;
-(NSArray*) getResourceIndexesFromMarkers:(NSString*) externalLayerId;
-(ISIMarkerInfo*) setMarkerSelected:(NSString*)externalLayerId query:(NSDictionary*)query isAutoZoom:(Boolean) isAutoZoom;
-(void) requestGPSToFirstMarkerLeg;
-(ISIDirectionsLeg*) getDirections:(NSString*)externalLayerId query:(NSDictionary*)query;

@end
