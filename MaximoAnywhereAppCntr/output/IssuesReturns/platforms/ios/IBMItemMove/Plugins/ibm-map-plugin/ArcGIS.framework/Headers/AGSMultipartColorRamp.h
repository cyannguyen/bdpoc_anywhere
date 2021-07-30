/*
 COPYRIGHT 2014 ESRI
 
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

@class AGSColorRamp;

/** @file AGSMultipartColorRamp.h */ //Required for Globals API doc

/** @brief Multipart color ramp class
 
 Provides information describing a multipart color ramp.  It is intended
 to be used to define non-contiguous color ramps.
 
 @define{AGSMultipartColorRamp.h, ArcGIS}
 @since 10.2.4
 */
@interface AGSMultipartColorRamp : AGSColorRamp

/** The array of @c AGSColorRamp objects which make up the parts of @c AGSMultipartColorRamp.
 Note that each of the elements of the array should be of type AGSAlgorithmicColorRamp since
 having nested @c AGSMutipartColorRamp objects is not allowed.
 @since 10.2.4
 */
@property (nonatomic, copy) NSArray *colorRamps;

/** Initialize a @c AGSMultipartColorRamp with the given color ramps.
 @param colorRamps array of color ramps which make up the multipart color ramp.
 @since 10.2.4
 */
-(id)initWithColorRamps:(NSArray *)colorRamps;

/** Create a new @c AGSMultipartColorRamp with the given color ramps.
 @param colorRamps array of color ramps which make up the multipart color ramp.
 @return A new multipart color ramp.
 @since 10.2.4
 */
+(id)multipartColorRampWithColorRamps:(NSArray *)colorRamps;

@end
