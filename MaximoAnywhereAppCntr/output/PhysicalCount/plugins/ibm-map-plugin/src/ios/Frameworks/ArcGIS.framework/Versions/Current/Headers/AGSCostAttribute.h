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

/** @file AGSCostAttribute.h */

/** @brief Transportation network cost attribute description.
 
 Instances of this class represent information about cost attribute
 supported by transportation network.
 
 Cost attributes can be retrieved from the @c AGSNetworkDefinition#costAttributes property.
 
 @agssince{10.2, 10.2}
 */
@interface AGSCostAttribute : NSObject

/** Cost attribute name.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *name;

/** Cost attribute units.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, assign, readonly) AGSNAUnit units;

/** Array of @c AGSAttributeParameter objects. Each object represents an attribute parameter.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSArray *parameters;

@end
