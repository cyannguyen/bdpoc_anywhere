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

/** @file AGSLayerInfo.h */ //Required for Globals API doc

/** @brief Information about a layer.
 
 Instances of this class represent information about a layer.
 
 @define{AGSLayerInfo.h, ArcGIS}
 @agssince{10.1.1, 10.2}
 */
@interface AGSLayerInfo : NSObject <AGSCoding>

/** ID of the layer. The topmost layer is usually 0, and each layer follows
 sequentially. If a layer is added or removed from the source map document,
 the ID values will shift accordingly.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, assign) NSUInteger layerId;

/** User-friendly name of the layer.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, copy) NSString *name;

/** The minimum scale at which this layer is visible. If map's scale is lower
 than this scale, the layer won't be visible.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, assign) double minScale;

/** The maximum scale at which this layer is visible. If map's scale is higher
 than this scale, the layer won't be visible.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, assign) double maxScale;

/** An array of @c UIImage (iOS) or @c NSImage (OS X) objects representing legend swatches (images)
 for this layer. You need to invoke the @c retrieveLegendInfo method on
 @c AGSMapServiceInfo for this property to be populated, unless this is coming from an @c AGSLocalTiledLayer.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, copy) NSArray *legendImages;

/** An array of strings representing the text for each legend swatch
 of this layer. You need to invoke the @c retrieveLegendInfo method on
 @c AGSMapServiceInfo for this property to be populated, unless this is coming from an @c AGSLocalTiledLayer.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, copy) NSArray *legendLabels;

@end
