//
//  ISIAdjustView.h
//  MaximoAnywhereWorkExecutionIphone
//
//  Created by Anywhere on 04/04/16.
//
//

#import <Foundation/Foundation.h>
#import <CoreGraphics/CGGeometry.h>

@interface ISIAdjustView : NSObject

//static methods to change internal properties
+(CGFloat) x;
+(void) setX:(int)value;
+(CGFloat) y;
+(void) setY:(int)value;
+(CGFloat) height;
+(void) setHeight:(int)value;
+(CGFloat) width;
+(void) setWidth:(int)value;

//wherever app can call it to adjust the main view, just one time
+(CGRect)adjustMainViewApplication: (CGRect) viewBounds;

//wherever view can call it to adjust the current view, for example, mapview
+(CGRect)adjustCommonViewApplication: (CGRect) viewBounds;

@end
