//
//  ISILayerInfo.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 2/4/2014.
//
//

#import <Foundation/Foundation.h>

@interface ISILayerInfo : NSObject

// Dale layerId
@property NSString *externalLayerId;
// Map provider layer id
//@property NSString *internalLayerId;
@property NSUInteger internalLayerId;
// map resource indexes to marker uids
// the resource index is the index coming from the JS side when a layer is added see EsriMap.addLayer()
// the marker uid is the map provider marker (graphic) id
@property NSMutableArray *resourceIndexMarkerUidMap;

-(id) initWithExternalLayerId:(NSString*)externalLayerId internalLayerId:(NSUInteger)internalLayerId resourceIndexMarkerUidMap:(NSMutableArray*)resourceIndexMarkerUidMap;
+(id) layerInfoWithExternalLayerId:(NSString*)externalLayerId internalLayerId:(NSUInteger)internalLayerId resourceIndexMarkerUidMap:(NSMutableArray*)resourceIndexMarkerUidMap;

@end
