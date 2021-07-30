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

@protocol AGSLayerCalloutDelegate;

/** @brief Protocol defining behavior for hit-testing and callout
 
 This protocol contains properties for a layer that define its behavior
 for  hit-testing features when a user taps on the map and for
 automatically displaying callouts for hit-tested features.
 
 @define{AGSHitTestable.h, ArcGIS}
 @agssince{10.2, 10.2}
 */
@protocol AGSHitTestable <NSObject>

/** Property that determines if the layer allows its features to be hit-tested when a user taps on the map. Default is YES, and hit-tested features are returned to @c AGSMapViewTouchDelegate#mapView:didClickAtPoint:mapPoint:features: as long as a callout is not automatically displayed.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, assign) BOOL allowHitTest;

/** Property that determines if the layer allows callouts to be shown automatically when a user taps on any of its features. Default is YES, and whenever features are found during hit-testing, the layer's @c #calloutDelegate is consulted to find out what should be shown in the callout for the top-most feature. If the layer's calloutDelegate is not set, @c AGSCallout#delegate is consulted next.
 
    If this property is set to NO, callout will never automatically display for any hit-tested features, although you could still programatically display the callout for any features in the layer.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, assign) BOOL allowCallout;

/** Delegate that allows the layer to react when a callout is shown for one of it's features. The delegate can set up the callout to display relevant information about the feature, or can choose to omit displaying the callout.
 If this delegate is not set, @c AGSCallout#delegate will be consulted instead.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, weak) id<AGSLayerCalloutDelegate> calloutDelegate;

@end
