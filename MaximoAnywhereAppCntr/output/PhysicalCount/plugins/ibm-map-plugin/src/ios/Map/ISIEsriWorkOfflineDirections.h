//
//  ISIEsriWorkOfflineDirections.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 10/7/2014.
//
//

#import "ISIWorkOfflineDirections.h"
#import "ISIEsriPromiseRouteDelegator.h"
#import "ISIEsriRoutingService.h"
#import "ISIPromise.h"
#import <ArcGIS/ArcGIS.h>

@interface ISIEsriWorkOfflineDirections : ISIWorkOfflineDirections <ISIPromiseDelegate>

@property NSLocale *locale;
@property AGSSRUnit lengthUnit;
@property AGSTiledLayer *map;
@property NSMutableArray *markers;

@property ISIEsriRoutingService *routingService;

@end
