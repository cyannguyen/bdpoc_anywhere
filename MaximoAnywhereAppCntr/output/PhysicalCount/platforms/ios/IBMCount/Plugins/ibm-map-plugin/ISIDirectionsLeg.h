//
//  ISIDirectionsLeg.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 16/4/2014.
//
//

#import <Foundation/Foundation.h>
#import <ArcGIS/ArcGIS.h>

@interface ISIDirectionsLeg : NSObject

-(id) init;

@property NSMutableArray *steps;

@property NSMutableString *directions;

@property NSString *lengthUnit;
@property NSString *destinationEncodedPNG;
@property NSString *originEncodedPNG;

@property NSNumber *length;
@property NSNumber *time;
@property NSNumber *ETA;

@property NSNumber* index;
@property NSNumber* destinationIndex;
@property NSNumber* destinationId;
@property NSNumber* originIndex;
@property NSNumber* originId;


@end
