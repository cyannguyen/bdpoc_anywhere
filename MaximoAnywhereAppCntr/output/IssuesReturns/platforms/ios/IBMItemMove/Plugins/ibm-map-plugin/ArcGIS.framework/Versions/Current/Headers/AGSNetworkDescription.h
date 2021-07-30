/*
 COPYRIGHT 2013 ESRI
 
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

/** @file AGSNetworkDescription.h */

/** @brief Transportation network description.
 
 Instances of this class represent information about transportation network
 used by route task.
 
 Network description for an @c AGSRouteTask can be retrieved by passing @c AGSRouteTask
 the <code>retrieveNetworkDescription</code> message and listening to the
 <code>routeTask:operation:didRetrieveNetworkDescription:</code> delegate
 method.
 
 @agssince{10.2, 10.2}
 */
@interface AGSNetworkDescription : NSObject

/** Restriction usage attribute parameter values
 @agssince{10.2, 10.2}
 */
+ (NSArray *)restrictionUsageParameterValues;

/** Name of transportation network.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *name;

/** Array of @c AGSCostAttribute objects. Each object represents a cost attribute. 
 @agssince{10.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSArray *costAttributes;

/** Array of @c AGSRestrictionAttribute objects. Each object represents a restriction attribute.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSArray *restrictionAttributes;

/** Array of @c NSString objects. Each object represents a supported directions language.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSArray *supportedDirectionsLanguages;

/** Array of @c NSString objects. Each object represents a supported directions style.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSArray *supportedDirectionsStyles;

/** Array of @c NSString objects. Each object represents allowed restriction attribute parameter value.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSArray *restrictionUsageParameterValues;

@end
