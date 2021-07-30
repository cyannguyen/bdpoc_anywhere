//
//  ISIMarkerModel.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 3/19/14.
//
//

#import <Foundation/Foundation.h>
#import "ISIMarkerAnchor.h"

@interface ISIMarkerModel : NSObject

@property ISIMarkerAnchor *markerAnchor;
@property NSString *imagePath;
@property NSInteger fontSize;
@property NSInteger width;
@property NSInteger height;

-(id) initWithMarkerAnchor:(ISIMarkerAnchor*)markerAnchor imagePath:(NSString*)imagePath fontSize:(NSInteger)fontSize width:(NSInteger)width height:(NSInteger)height;
+(id) markerModelWithMarkerAnchor:(ISIMarkerAnchor*)markerAnchor imagePath:(NSString*)imagePath fontSize:(NSInteger)fontSize width:(NSInteger)width height:(NSInteger)height;

@end
