//
//  ISIMarkerAnchor.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 3/19/14.
//
//

#import <Foundation/Foundation.h>

@interface ISIMarkerAnchor : NSObject

@property (readonly) float xOffset;
@property (readonly) float yOffset;

-(id) initWithXOffset:(float)xOffset yOffset:(float)yOffset;
+(id) markerAnchorWithXOffset:(float)xOffset yOffset:(float)yOffset;
-(void) setOffset:(float)xOffset yOffset:(float)yOffset;

@end
