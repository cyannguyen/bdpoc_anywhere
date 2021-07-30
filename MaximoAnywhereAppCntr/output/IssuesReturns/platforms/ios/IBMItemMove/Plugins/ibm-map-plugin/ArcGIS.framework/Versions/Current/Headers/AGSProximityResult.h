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

/** @file AGSProximityResult.h */ //Required for Globals API doc

/** @brief The result of a proximity search.
 
 Instances of this class represent results of a proximity search using AGSGeometryEngine
 such as finding the nearest vertex or a coordinate of a geometry.
 @agssince{1.8, 10.2}
 */
@interface AGSProximityResult : NSObject

/** The point found.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, strong, readonly) AGSPoint *point;

/** The index of the point that was found within it's part.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, readonly) NSInteger pointIndex;

/** The index of the part in which the point was found.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, readonly) NSInteger partIndex;

/** The result distance.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, readonly) double distance;

@end

