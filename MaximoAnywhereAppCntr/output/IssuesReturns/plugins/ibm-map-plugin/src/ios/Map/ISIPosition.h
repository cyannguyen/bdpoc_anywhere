//
//  ISIPosition.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 2/4/2014.
//
//

#import <Foundation/Foundation.h>

@interface ISIPosition : NSObject


@property double latitudey;
@property double longitudex;
@property NSInteger uid;

-(id) initWithLatitudeY:(double)latitudeY longitudeX:(double)longitudeX uid:(NSInteger)uid;
+(id) positionWithLatitudeY:(double)latitudeY longitudeX:(double)longitudeX uid:(NSInteger)uid;



@end
