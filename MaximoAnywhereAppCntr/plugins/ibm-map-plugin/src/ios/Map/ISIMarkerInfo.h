//
//  ISIMarkerInfo.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 3/19/14.
//
//

#import <Foundation/Foundation.h>

@interface ISIMarkerInfo : NSObject

@property NSInteger index;
@property NSString *encodedPNG;
@property double latitudey;
@property double longitudex;

-(id) initWithEncodedPNG:(NSString*)encodedPNG index:(NSInteger)index latitudey:(double)latitudey longitudex:(double)longitudex;
+(id) markerInfoWithEncodedPNG:(NSString*)encodedPNG index:(NSInteger)index latitudey:(double)latitudey longitudex:(double)longitudex;

@end
