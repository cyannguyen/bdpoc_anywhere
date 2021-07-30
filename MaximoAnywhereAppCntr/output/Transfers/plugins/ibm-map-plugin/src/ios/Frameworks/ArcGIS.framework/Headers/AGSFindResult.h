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

@class AGSGraphic;

/** @file AGSFindResult.h */ //Required for Globals API doc

/** @brief A result of @c AGSFindTask operation
 
 Instances of this class represent results of an @c AGSFindTask operation. 
 
 @define{AGSFindTask.h, ArcGIS}
 @agssince{1.0, 10.2}
 */
@interface AGSFindResult : NSObject <AGSCoding>

/** Name of the layer's primary display field. 
 @agssince{1.0, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *displayFieldName;

/** The feature in the layer that contains or matches the search text. The 
 feature's attributes contain field values from the layer. The feature may or 
 may not have a geometry depending on whether it belongs to a layer or a table 
 respectively.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, strong, readonly) AGSGraphic *feature;

/** Name of the layer's field that contains the search text.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *foundFieldName;

/** ID of the layer that contains the search text.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, readonly) NSUInteger layerId;

/** Name of the layer that contains the search text.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *layerName;

@end