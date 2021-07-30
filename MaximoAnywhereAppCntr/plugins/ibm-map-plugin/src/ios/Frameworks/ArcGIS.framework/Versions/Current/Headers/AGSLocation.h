/*
 COPYRIGHT 2012 ESRI
 
 TRADE SECRETS: ESRI PROPRIETARY AND CONFIDENTIAL
 Unpublished material - all rights reserved under the
 Copyright Laws of the United States and applicable international
 laws, treaties, and conventions.
 
 For additional information, contact:
 Environmental Systems Research Institute, Inc.
 Attn: Contracts and Legal Services Department
 380 New York Street
 Redlands, California, 92373
 USA
 
 email: contracts@esri.com
 */

@class AGSPoint;

/*@file AGSLocation.h */

/** @brief An object that represents a location to be used by the location display.
 @agssince{10.1.1, 10.2}
 */
@interface AGSLocation : NSObject

/** The coordinates. The spatial reference is the spatial reference that the datasource
 provides and may not be in the same spatial reference as the map.
 @agssince{10.1.1, 10.2}
 */
@property (nonatomic, strong) AGSPoint *point;

/** The accuracy of the coordinates. Specified in meters.
 @agssince{10.1.1, 10.2}
 */
@property (nonatomic, assign) double accuracy;

/** The direction of travel. Different than "heading" which is the direction
 the device is facing.
 @agssince{10.1.1, 10.2}
 */
@property (nonatomic, assign) double course;

/** The velocity.
 @agssince{10.1.1, 10.2}
 */
@property (nonatomic, assign) double velocity;

/** Returns an autoreleased AGSLocation from a CLLocation.
 @agssince{10.1.1, 10.2}
 */
+(AGSLocation*)locationWithCLLocation:(CLLocation*)cllocation;

@end
