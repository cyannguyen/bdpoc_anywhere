//
//  ISIDirections.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 16/4/2014.
//
//

#import <Foundation/Foundation.h>
#import <ArcGIS/ArcGIS.h>

@interface ISIDirections : NSObject

-(id) init;

@property NSMutableArray *legs;
@property NSString *lengthUnit;

@property NSNumber* length;
@property NSNumber* time;
@property NSMutableString *directions;
@property NSString *language;
@property NSUInteger layerId;
@property NSNumber* ETA;

@end
