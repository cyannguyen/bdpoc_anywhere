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

/** @file AGSLayer+Subclass.h */ //Required for Globals API doc

@class AGSMapView;

/** Enumeration that specifies how a map was updated.
 @agssince{10.1.1, 10.2}
 */
typedef NS_ENUM(NSInteger, AGSMapUpdateType){
    AGSMapUpdateTypeSpatialExtent,
    AGSMapUpdateTypeTimeExtent,
    AGSMapUpdateTypeLayerAdded,
    AGSMapUpdateTypeLayerWillBeRemoved,
    AGSMapUpdateTypeLayerRemoved
};

/** @brief Information relevant to sublcasses of @c AGSLayer
 
 This category organizes the  methods that are relevant to subclassing a layer.
 Developer can create custom layers by paying special attention to the methods in this category. 
 
 Although you can sublcass @c AGSLayer directly to create a custom layer, it will often be easier to subclass @c AGSTiledLayer, @c AGSTiledServiceLayer, or @c AGSDynamicLayer.
 
 If you want to implement a custom tiled layer, you should consider subclassing  @c AGSTiledLayer or @c AGSTiledServiceLayer.
 
 If you want to implement a custom dynamic layer, you should consider subclassing
 @c AGSDynamicLayer.
 
 Regardless of what class you subclass, here are some guidelines
 If you implement a custom layer, you should set the error when drawing:
 If the layer draws successfully, you should set the error to nil.
 If the layer fails to draw the error should be set there as well.

 @agssince{10.1.1, 10.2}
 
 @see AGSTiledLayer (ForSubclassEyesOnly)
 @see AGSTiledServiceLayer (ForSubclassEyesOnly)
 @see AGSDynamicLayer (ForSubclassEyesOnly)
*/

@interface AGSLayer (ForSubclassEyesOnly)

/** Subclassses should set this property when the layer has an error loading or drawing.
 @agssince{10.1.1, 10.2}
 */
@property (nonatomic, strong, readwrite) NSError *error;

/** The default dpi for the layer.
 @agssince{10.1.1, 10.2}
 */
-(int)defaultDpi;

/** Subclasses should call this when the layer is ready to draw.
 Implementation for this method is provided by the framework.
 @agssince{10.1.1, 10.2}
 */
-(void)layerDidLoad;

/** Subclasses should call this when the layer fails to load.
  Implementation for this method is provided by the framework.
 @agssince{10.1.1, 10.2}
 */
-(void)layerDidFailToLoad:(NSError*)error;

/** Called when the status of the layer's spatial reference has been established.
 You can override this method, just make sure to call the super's implementation.
 @agssince{10.1.1, 10.2}
 */
-(void)spatialReferenceStatusInitialized;

/** Method called when the map is updated.
 You can override this, but make sure to call the super's implementation.
 @agssince{10.1.1, 10.2}
 */
-(void)mapDidUpdate:(AGSMapUpdateType)updateType;

/** The map that the layer is in.
 @agssince{10.1.1, 10.2}
 */
@property (nonatomic, weak, readwrite) AGSMapView *mapView;

@end