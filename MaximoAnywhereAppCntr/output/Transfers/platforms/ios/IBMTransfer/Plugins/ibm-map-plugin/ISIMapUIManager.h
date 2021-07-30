//
//  ISIMapUIManager.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 3/19/14.
//
//

#import <Foundation/Foundation.h>
#import <ArcGIS/ArcGIS.h>
#import <Cordova/CDV.h>
#import "ISIAbstractMap.h"

@interface ISIMapUIManager : NSObject

@property (readonly, strong) ISIAbstractMap *map;
@property (readonly, strong) AGSMapView *mapView;
@property (readonly) UIWebView *webView;
@property (readonly) MapType mapType;

@property (readonly) NSUInteger previousViewHashCode;
@property (readonly) CGRect previousViewRect;

-(void) showMap:(int)x y:(int)y width:(int)width height:(int)height;
-(void) hideMap;

-(id) initWithAbstractMap:(ISIAbstractMap*)map;

@end
