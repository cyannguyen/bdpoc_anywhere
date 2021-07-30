//
//  ISIWorkOfflineDirections.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 10/7/2014.
//
//

#import <Foundation/Foundation.h>
#import "ISIMapProperties.h"
#import "ISIPromise.h"

@interface ISIWorkOfflineDirections : NSObject

@property ISIMapProperties *offlineMapProperties;

/**
 *
 * Generate a jsonObject ready to be cached
 * remember to use AbstractMap.prepareCache and AbstractMap.generateUUID
 *
 * @param jsonArray
 * @param additionalParameter, specific parameters that child classes of this one might need
 * @return
 */
-(ISIPromise*) getDirectionsToCache:(NSArray*)jsonArray additionalParameters:(NSDictionary*)additionalParameters;
-(void) setMapProperties:(ISIMapProperties*)mapProperties;

@end
