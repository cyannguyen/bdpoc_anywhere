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
@class AGSGraphic;

/** @brief A stop along a route
 
 Instances of this class represent stops - locations that must be visited along a route. 
 Stops are used as inputs to the solve operation of an @c AGSRouteTask. You need atleast
 two stops to compute a route, although you can have more.
 
 Apart from the properties declared on this class, a stop can have additional properties depending upon
 how the Route layer in the Network Analyst service is configured. These properties can 
 be set and accessed through the graphic's attributes.
 
 @agssince{1.8, 10.2}
 */
@interface AGSStopGraphic : AGSGraphic <AGSCoding> {
}

/** An integer representing the index of the stop. This index value is 1-based. 
 The sequence number indicates the sequence in which you want the stop to be visited by the route.
 
 If you enable the @c findBestSequence property on AGSRouteTaskParameters, 
 the service will attempt to reorder the stops to find the most optimal route. 
 You can also enable the @c preserveFirstStop and @c preserveLastStop properties on AGSRouteTaskParameters 
 if you do not want the origin and destination stops to be reordered.
 
 @agssince{1.8, 10.2}
 */
@property (nonatomic, assign) NSUInteger sequence;

/** The name of the route associated with the stop.
 You should specify a routeName if you want to group stops into different routes. 
 Stops having the same routeName will be assigned a separate route, 
 and stops without a routeName will not be included in the analysis. 
 If you do not assign a routeName to any stops, all stops will be combined into a single route.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, weak) NSString *routeName;

/** A user-friendly name of the stop.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, weak) NSString *name;

/** The begining time of a permissible time window for the stop. This is only honored if the 
 <code>useTimeWindows</code> property of @c AGSRouteParameters is 
 <code>true</code>. The route will attempt to visit
 the stop only within its time window, if possible.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, weak) NSDate *timeWindowStart;

/** The ending time of a permissible time window for the stop. This is only honored if the
 <code>useTimeWindows</code> property of @c AGSRouteParameters is 
 <code>true</code>, The route will attempt to visit
 the stop only within its time window, if possible. 
 @agssince{1.8, 10.2}
 */
@property (nonatomic, weak) NSDate *timeWindowEnd;

/** The arrival time for the given stop.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSDate *arrivalTime;

/** The departure time for the given stop.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSDate *departureTime;

/** The wait time in minutes for the given stop.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, assign, readonly) double waitMinutes;

/** The violation time in minutes for the given stop.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, assign, readonly) double violationMinutes;

/** Returns added cost value for given impedance or accumulate attribute.
 @agssince{10.2, 10.2}
 */
- (double)addedCostForAttribute:(NSString *)attributeName;

/** Sets added cost value for given impedance or accumulate attribute.
 @agssince{10.2, 10.2}
 */
- (void)setAddedCost:(double)cost forAttribute:(NSString *)attributeName;

@end
