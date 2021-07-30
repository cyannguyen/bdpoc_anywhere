//
//  ISIEsriMapEventDispatcher.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 3/27/14.
//
//

#import <Foundation/Foundation.h>
#import <ArcGIS/ArcGIS.h>
#import "ISIJSEventDispatcher.h"
#import "ISILogger.h"
@class ISIEsriMap;

@interface ISIEsriMapEventDispatcher : NSObject <AGSLayerDelegate, AGSMapViewTouchDelegate, AGSMapViewLayerDelegate>

@property NSString *mapJSHandler;
@property NSString *defaultMapJSListener;
@property ISIJSEventDispatcher *eventDispatcher;
@property ISIEsriMap *map;
@property AGSMapView *mapView;

-(id) initWithEsriMap:(ISIEsriMap*)map;
-(void) sendEvent:(ISIJSEvent*)jsEvent;
+(id) esriMapEventDispatcherWithEsriMap:(ISIEsriMap*)map;

@end
