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

/** @file AGSLocatorField.h */ //Required for Globals API doc

/** @brief An object that represents information about a locator field.
 
 Instances of this class represent information about locator field.
 @agssince{10.2, 10.2}
 */
@interface AGSLocatorField : NSObject <AGSCoding>

/** Name of the field.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *name;

/** Type of values in the field. Possible field types include
 
 @li @c AGSFieldTypeInteger
 @li @c AGSFieldTypeSmallInteger
 @li @c AGSFieldTypeDouble
 @li @c AGSFieldTypeSingle
 @li @c AGSFieldTypeString
 @li @c AGSFieldTypeDate
 @li @c AGSFieldTypeGeometry
 @li @c AGSFieldTypeOID
 @li @c AGSFieldTypeBlob
 @li @c AGSFieldTypeGlobalID
 @li @c AGSFieldTypeRaster
 @li @c AGSFieldTypeGUID
 @li @c AGSFieldTypeXML
 
 @agssince{10.2, 10.2}
 */
@property (nonatomic, assign, readonly) AGSFieldType type;

/** Alias name of the field. Alias name is usually more user friendly than the
 actual field name which may use underlying datasource naming conventions.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *alias;

/** Indicates if the field is mandatory.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, assign, readonly) BOOL mandatory;

/** The field length.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, assign, readonly) NSInteger length;

@end