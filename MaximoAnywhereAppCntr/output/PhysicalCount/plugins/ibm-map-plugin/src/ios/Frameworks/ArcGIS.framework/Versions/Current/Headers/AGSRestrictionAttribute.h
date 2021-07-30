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

/** @file AGSRestrictionAttribute.h */

/** @brief Transportation network restriction attribute description.
 
 Instances of this class represent information about restriction attribute 
 supported by transportation network.
 
 Restriction attributes can be retrieved by querying @c AGSNetworkDefinition
 the <code>restrictionAttributes</code> property.
 
 @agssince{10.2, 10.2}
 */
@interface AGSRestrictionAttribute : NSObject

/** Restriction attribute name.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *name;

/** Restriction usage parameter attribute name.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *restrictionUsageName;

/** Array of @c AGSAttributeParameter objects. Each object represents an attribute parameter.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSArray *parameters;

@end
