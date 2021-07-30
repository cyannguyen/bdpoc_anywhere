//
//  ISIEsriRoutingService.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 15/4/2014.
//
//

#import <Foundation/Foundation.h>
#import <ArcGIS/ArcGIS.h>
#import "ISILogger.h"
#import "ISIEsriPromiseRouteDelegator.h"

@interface ISIEsriRoutingService : NSObject <ISIEsriPromiseRouteProtocol>

@property (readonly) AGSSpatialReference *mapSpatialReference;
@property (readonly) AGSCredential *userCredentials;
@property NSString *routingServiceUrl;


-(id) initWithCredentials:(AGSCredential*)userCredentials mapSpatialReference:(AGSSpatialReference*)mapSpatialReference routingService:(NSString*)routingService;
-(id) initWithRoutingService:(NSString*)routingService mapSpatialReference:(AGSSpatialReference*)mapSpatialReference;
-(AGSSpatialReference*) getMapSpatialReference;
-(void) setMapSpatialReference:(AGSSpatialReference *)mapSpatialReference;
-(AGSCredential*) getUserCredentials;
-(void) setUserCredentials:(AGSCredential *)userCredentials;
-(NSString*) getRoutingServiceUrl;
-(void) setRoutingServiceUrl:(NSString *)routingServiceUrl;

-(void) getRoutingResult:(NSArray*) markers locale:(NSLocale*)locale  lengthUnit:(AGSNAUnit)lengthUnit routeResolveDelegate:(id<AGSRouteTaskDelegate>)routeResolveDelegate;
-(ISIPromise*) generateRoutingResultToJsonObject:(NSArray*)markers locale:(NSLocale*)locale lengthUnit:(AGSSRUnit)lengthUnit;
-(NSDictionary*) routingResultToJsonObject:(AGSRouteTaskResult*)routingResults markers:(NSArray*)markers locale:(NSLocale*)locale lengthUnit:(AGSSRUnit)lengthUnit pathColor:(UIColor*) pathColor pathThickness:(NSInteger) pathThickness;
@end
