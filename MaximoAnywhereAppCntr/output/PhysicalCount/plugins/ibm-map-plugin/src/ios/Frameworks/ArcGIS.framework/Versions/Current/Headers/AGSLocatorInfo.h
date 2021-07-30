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

#import <Foundation/Foundation.h>

@class AGSLocatorField;
@class AGSSpatialReference;
@protocol AGSCoding;

/** @file AGSLocatorInfo.h */ //Required for Globals API doc

/** @brief Represents locator service information.
 
 Instances of this class represent meta information returned by @c AGSLocator for
 service info operation.
 
 @define{AGSLocator.h, ArcGIS}
 @agssince{10.2, 10.2}
 */
@interface AGSLocatorInfo : NSObject<AGSCoding>

/** Locator service human readable description.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *serviceDescription;

/** Array of @c AGSLocatorField objects representing input address fields to be used for geocoding.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSArray *addressFields;

/** Field for single line address geocoding. If feature is not supported then @c nil.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, strong, readonly) AGSLocatorField *singleLineAddressField;

/** Array of @c AGSLocatorField objects returned by locator for geocoded address candidates.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSArray *candidateFields;

/** Array of @c AGSLocatorField objects returned by locator for geocoded intersection candidates.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSArray *intersectionCandidateFields;

/** Locator spatial reference.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, strong, readonly) AGSSpatialReference *spatialReference;

@end
