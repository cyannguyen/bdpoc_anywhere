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



/** @file AGSRouteResult.h */

@class AGSDirectionSet;
@class AGSGraphic;

/** @brief The result of the @c AGSRouteTask. 
 
 The result of the @c AGSRouteTask. This object should not be created manually.
 An array of @c AGSRouteResult objects will be returned within an @c AGSRouteTaskResult.
 @agssince{1.8, 10.2}
 */
@interface AGSRouteResult : NSObject

/** Route directions are returned if @c AGSRouteTaskParameters <code>returnDirections</code>
 property is set to <code>true</code>.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, strong, readonly) AGSDirectionSet *directions;

/** The route graphic that is returned if @c AGSRouteTaskParameters 
 <code>returnRouteGraphics</code> property is <code>true</code>.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, strong, readonly) AGSGraphic *routeGraphic;

/** The name of the route.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *routeName;

/** Array of @c AGSStopGraphic objects. Returned only if @c AGSRouteTaskParameters 
 <code>returnStopGraphics</code> property is <code>true</code>.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, copy, readonly) NSArray *stopGraphics;

/** The length of the route in miles. In order to get this value, length attribute should be set in
 as impedance or accumulate attribute in parameters object.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, assign, readonly) double totalMiles;

/** The length of the route in kilometers. In order to get this value, length attribute should be set in
 as impedance or accumulate attribute in parameters object.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, assign, readonly) double totalKilometers;

/** The total time in minutes calculated for the route. In order to get this value, time attribute should be set in
 as impedance or accumulate attribute in parameters object.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, assign, readonly) double totalMinutes;

/** This property stores the route's overall wait time, which is the time spent at stops waiting for time windows to open.
 In order to get this value, timeWindows must be enabled and startTime/endTime for time windows must be specified.
 @since 10.2.2
 */
@property (nonatomic, assign, readonly) double totalWaitMinutes;

/** This property stores the route's overall violation time at stops. Violation time is added when the route arrives 
 at a stop after the time window has ended; it is the difference between the ArriveTime and TimeWindowEnd. In order to 
 get this value, timeWindows must be enabled and startTime/endTime for time windows must be specified.
 @since 10.2.2
 */
@property (nonatomic, assign, readonly) double totalViolationMinutes;

/** Returns total cost value for given attribute.
 @agssince{10.2, 10.2}
 */
- (double)totalCostForAttribute:(NSString *)attributeName;

@end
