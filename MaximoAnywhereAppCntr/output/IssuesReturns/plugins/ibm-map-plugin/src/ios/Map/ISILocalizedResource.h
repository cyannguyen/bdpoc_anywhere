//
//  ISILocalizedResource.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 3/31/14.
//
//

#import <Foundation/Foundation.h>

@interface ISILocalizedResource : NSObject

@property double x;
@property double y;
@property NSDictionary *attributes;

-(id) initWithX:(double)x y:(double)y attributes:(NSDictionary*)attributes;
+(id) localizedResourceWithX:(double)x y:(double)y attributes:(NSDictionary*)attributes;

@end
