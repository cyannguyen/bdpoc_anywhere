/*
 COPYRIGHT 2011 ESRI
 
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




@protocol AGSCoding;
@class AGSEnvelope;
@class AGSPolyline;

/** @brief Object containing an array of graphics returned by an @c AGSRoute.
 
 Object containing an array of @c AGSDirectionGraphic objects that represent the directions of an @c AGSRoute.

 @agssince{1.8, 10.2}
 */
@interface AGSDirectionSet : NSObject <AGSCoding>

/** Array of @c AGSDirectionGraphic objects representing directions for a route.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, copy, readonly) NSArray *graphics;

/** The extent of the resulting route.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, strong, readonly) AGSEnvelope *extent;

/** A single polyline representing the route.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, strong, readonly) AGSPolyline *mergedGeometry;

/** The Id of the route returned from the server.
 @agssince{1.8, 10.2}
 @deprecated Deprecated at 10.2. No replacement.
 */
@property (nonatomic, copy, readonly) NSString *routeId __attribute__((deprecated));

/** The name specified in @c AGSRouteTaskParameters <code>stops</code> property.
 This property is not supported by local route task and error is returned if this is set.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *routeName;

/** The actual drive time calculated for the route.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, assign, readonly) double totalDriveTime;

/** The length of the route as specified in @c AGSRouteTaskParameters <code>directionsLengthUnits</code> property.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, assign, readonly) double totalLength;

/** The total time calculated for the route as specified in @c AGSRouteTaskParameters
 <code>directionsTimeAttributeName</code> property.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, assign, readonly) double totalTime;

@end
