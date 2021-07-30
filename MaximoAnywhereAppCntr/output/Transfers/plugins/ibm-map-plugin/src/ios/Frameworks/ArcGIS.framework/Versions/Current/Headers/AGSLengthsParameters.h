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

@class AGSPolyline;

/** @file AGSLengthsParameters.h */ //Required for Globals API doc

/** @brief Parameters for <code>AGSGeometryServiceTask</code>'s 
 <code>lengthsWithParameters:</code> operation.
 
 Instances of this class represent parameters for <code>AGSGeometryServiceTask</code>'s 
 <code>lengthsWithParameters:</code> operation. 
 
 @define{AGSLengthsParameters.h, ArcGIS}
 @agssince{1.0, 10.2}
 @see AGSGeometryServiceTask
 */
@interface AGSLengthsParameters : NSObject <AGSCoding>

/** The array of polylines whose lengths are to be computed. 
 @agssince{1.0, 10.2}
 */
@property (nonatomic, copy) NSArray *polylines;

/** If #polylines are in geographic coordinate system, then #geodesic 
 needs to be set to <code>true</code> in order to calculate the ellipsoidal 
 shortest path distance between each pair of the vertices in the polylines. 
 If #lengthUnit is not specificed, then output is always returned in meters.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, assign) BOOL geodesic;

/** The length unit in which perimeters of polylines will be calculated. It 
 can be any @c AGSSRUnit constant. If @p lengthUnit is not specified, the units are 
 derived from the spatial reference of the input polylines.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, assign) AGSSRUnit lengthUnit;

/** Initialize parameters with a polyline.
 @param polyline 
 @agssince{1.8, 10.2}
 */
- (id)initWithPolyline:(AGSPolyline*)polyline;

/** Returns an autoreleased instance of the <code>AGSLengthParameters</code> object.
 @agssince{1.0, 10.2}
 */
+ (id)lengthParameters;

/** Returns an autoreleased instance of the <code>AGSLengthParameters</code> object 
 initialized with a single polyline.
 @agssince{1.8, 10.2}
 */
+ (id)lengthParametersWithPolyline:(AGSPolyline*)polyline;

@end
