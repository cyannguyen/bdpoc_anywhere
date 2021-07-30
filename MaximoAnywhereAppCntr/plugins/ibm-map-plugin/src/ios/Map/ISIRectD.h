//
//  ISIRectD.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 3/31/14.
//
//

#import <Foundation/Foundation.h>

@interface ISIRectD : NSObject

@property double left, top, right, bottom;

-(BOOL) containsX:(double)x y:(double)y;

-(id) initWithLeft:(double)left top:(double)top right:(double)right bottom:(double)bottom;
+(id) rectDWithLeft:(double)left top:(double)top right:(double)right bottom:(double)bottom;


@end
