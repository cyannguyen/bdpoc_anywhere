//
//  ISIDirectionsParser.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 16/4/2014.
//
//

#import <Foundation/Foundation.h>
#import <ArcGIS/ArcGIS.h>
#import "ISIDirections.h"
#import "ISIDirectionsLeg.h"
#import "ISIDirectionsStep.h"

@interface ISIDirectionsParser : NSObject

+(ISIDirections*) parseEsri:(AGSRouteResult*)route stops:(NSArray*)stops layerId:(NSUInteger)layerId language:(NSString*)language lengthUnit:(NSString*) lengthUnit currentLocationMessage: (NSString*) currentLocationMessage;

@end
