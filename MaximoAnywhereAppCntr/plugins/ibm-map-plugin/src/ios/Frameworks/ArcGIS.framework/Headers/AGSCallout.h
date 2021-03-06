/*
 COPYRIGHT 2009 ESRI
 
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

@protocol AGSCalloutDelegate;
@class AGSMapView;
@class AGSPoint;
@class AGSGraphic;
@class AGSLayer;
@class AGSLocationDisplay;

/** Supported positions of the callout's leader. The position is relative
 to the callout itself.
 @agssince{2.1, 10.2}
 */
typedef NS_OPTIONS(NSUInteger, AGSCalloutLeaderPosition) {
    AGSCalloutLeaderPositionBottom = 1UL << 0,          /*!< Leader is placed on the bottom edge of the callout  */
    AGSCalloutLeaderPositionTop = 1UL << 1,             /*!< Leader is placed on the top edge of the callout */
    AGSCalloutLeaderPositionLeft = 1UL << 2,            /*!< Leader is placed on the left edge of the callout */
    AGSCalloutLeaderPositionRight = 1UL << 3,           /*!< Leader is placed on the right edge of the callout */
    AGSCalloutLeaderPositionAny = AGSCalloutLeaderPositionBottom | AGSCalloutLeaderPositionTop | AGSCalloutLeaderPositionLeft | AGSCalloutLeaderPositionRight                   /*!< Best leader position such that the callout is completely visible on the map without panning the map. For iPad, precedence is based on the order - Left, Right, Top, Bottom. For other devices precedence is based on the order - Bottom, Top, Left, Right. */
} ;

/** @file AGSCallout.h */ //Required for Globals API doc

/** @brief A callout window.
 
 Instances of this class represent a callout window. A callout can be used to 
 display information on a map. The callout can display a title and a detail string.
 It can also display a picture to the left of the title and detail, and
 an accessory button to the right which can be used to present a secondary
 view with more details. 
 
 You can change the content and look of the callout by setting its properties. You can also embed a custom view
 if you want to completely customize the layout.
 
 By default, the  map's callout shows information about a feature when a user 
 taps on the feature. The map's callout also shows information for each location
 update provided by the AGSLocationDisplay.
 
 To hide the callout, you can set it's <code>hidden</code> property.
 
 @extends UIView
 @see @concept{map-callout.htm, Displaying a Callout}
 @see @c AGSCalloutDelegate and @c AGSLayerCalloutDelegate
 @agssince{1.0, 10.2}
 */

#if TARGET_OS_IPHONE
@interface AGSCallout : AGSView

/** Callout width. This property is ignored if using a custom view.
 @agssince{1.0, 10.2}
 */
@property (nonatomic) CGFloat width;

/** The custom view to display in the callout. If this property is specified,
 the developer is responsible for the content displayed in the callout. The callout will expand
 to fit the dimensions of the custom view. Most of the other properties related to the look (such as @c #width, #color, etc.) and content
 of the callout (such as @c #title, @c #detail, @c #image, @c #accessoryButtonImage, etc.) will be ignored.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, strong) AGSView *customView;


/** The type of button for the accessory button.
 @agssince{1.8, 10.2}
 */
@property (nonatomic) UIButtonType accessoryButtonType;

/** The optional image used for the accessory button.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, strong) UIImage *accessoryButtonImage;


/** The optional image used for displaying content to the left of the text labels.
 The image will be scaled to 40x40 points.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, strong) AGSImage *image;

/** This is a parameter than specifies that the width of the callout should adjust to the size
 of the text. This parameter is ignored if using a custom view.
 @agssince{1.8, 10.2}
 */
@property (nonatomic) BOOL autoAdjustWidth;

/** Indicates whether the accessory button is hidden.
 Default is NO.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, assign, getter=isAccessoryButtonHidden) BOOL accessoryButtonHidden;

/** Flags specifying the possible leader locations when showing the callout. Possible values include:
 
 @li @c AGSCalloutLeaderPositionLeft
 @li @c AGSCalloutLeaderPositionRight
 @li @c AGSCalloutLeaderPositionTop
 @li @c AGSCalloutLeaderPositionBottom
 @li @c AGSCalloutLeaderPositionAny
 
 
 These values can be combined with the bitwise OR operator. The default value
 is  @c AGSCalloutLeaderPositionBottom .
 
 <code>AGSCalloutLeaderPositionAny</code> will attempt to find the best location for the given
 point. On the iPad, precedence is given based on the following sequence - left, right, bottom, top. On all other iOS devices,
 it is - bottom, top, left, right.
 
 @agssince{2.1, 10.2}
 */
@property (nonatomic, assign) AGSCalloutLeaderPosition leaderPositionFlags;

/** Callout's border color. Default is nil.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, strong) AGSColor *borderColor;

/** Callout's border width. Default is 0.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, assign) CGFloat  borderWidth;


#elif (TARGET_OS_MAC && !TARGET_OS_IPHONE)
@interface AGSCallout : NSObject

@property (nonatomic, assign, getter = isHidden) BOOL hidden;

/** Determines if the top or bottom is highlighted.
 @agssince{10.2, 10.2}
*/
@property (nonatomic, assign) BOOL highlightTop;

#endif

/** The map that will display the callout.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, weak, readonly) AGSMapView *mapView;

/** Location in map coordinates where the callout's leader should point to. If 
 the callout is shown in response to a user tap, this property contains the 
 tapped location. If the callout is shown in response to a AGSLocationDisplay location update, 
 this property contains that location. 
 @agssince{1.0, 10.2}
 */
@property (nonatomic, strong, readonly) AGSPoint *mapLocation;

/** Point offset in screen coordinates from the map location that the callout 
 leader should point to. This is generally used with Marker symbols that have 
 offsets so that the callout will display in the correct location as the map is 
 scaled (zoomed in or out). A positive x-value shifts the callout to the right.
 A positive y-value shifts the callout down.
 @agssince{1.0, 10.2}
 @deprecated Deprecated at 10.2. Use @c AGSCallout#screenOffset instead.
 */
@property (nonatomic, readonly) CGPoint pixelOffset __attribute__((deprecated));

/** Point offset in screen coordinates from the map location that the callout
 leader should point to. This is generally used with Marker symbols that have
 offsets so that the callout will display in the correct location as the map is
 scaled (zoomed in or out). A positive x-value shifts the callout to the right.
 A positive y-value shifts the callout down.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, readonly) CGPoint screenOffset;

/** Text for title label.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, copy) NSString *title;

/** Text for detail label.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, copy) NSString *detail;

/** Background color of callout. Default is black with .8 alpha.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, strong) AGSColor *color;

/** Highlight color of callout. Default is white with .15 alpha.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, strong) AGSColor *highlight;

/** Text color. Default is white.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, strong) AGSColor *titleColor;

/** Detail text color. Default is white.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, strong) AGSColor *detailColor;

/** The callout's delegate.
 @agssince{10.1.1, 10.2}
 */
@property (nonatomic, weak) id<AGSCalloutDelegate> delegate;

/** The margin in points around the customView.
 This property is ignored if not using a custom view.
 @agssince{1.8, 10.2}
 */
@property (nonatomic) CGSize margin;

/** The corner radius in points for the rounded corners.
 This property is ignored if not using a custom view.
 @agssince{1.8, 10.2}
 */
@property (nonatomic) CGFloat cornerRadius;

/** The maximum width of the callout if the callout is autosizing to the text.
 To autosize to the text width, set the autoAdjustWidth property to YES. This property is ignored
 if using a custom view.
 @agssince{1.8, 10.2}
 */
@property (nonatomic) CGFloat maxWidth;

/** The object that the callout is shown for. Could be a feature, could be a AGSLocationDisplay.
 @agssince{10.1.1, 10.2}
 */
@property (nonatomic, strong, readonly) id representedObject;

/** The AGSFeature that the callout is shown for. Can be nil.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, strong, readonly) id<AGSFeature> representedFeature;

/** The AGSLayer that the callout is shown for. Can be nil.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, strong, readonly) AGSLayer *representedLayer;

/** The AGSLocationDisplay that the callout is shown for. Can be nil.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, strong, readonly) AGSLocationDisplay *representedLocationDisplay;

/** Moves the callout to the specified map location and screen point offset.
 @param mapLocation The location on the map to move to.
 @param pixelOffset The offset from the map location to place the callout in screen points.
 @param animated Flag to determine if action should be animated.
 @deprecated Deprecated at 10.2. Use @c AGSCallout#moveCalloutTo:screenOffset:animated: instead.
 @agssince{1.0, 10.2}
 */
-(void)moveCalloutTo:(AGSPoint*)mapLocation pixelOffset:(CGPoint)pixelOffset animated:(BOOL)animated __attribute__((deprecated));

/** Shows the callout at the specified map location and screen point offset
 @param mapLocation The location on the map to move to.
 @param pixelOffset The offset from the map location to place the callout in screen points.
 @param animated Flag to determine if action should be animated.
 @deprecated Deprecated at 10.2. Use @c AGSCallout#showCalloutAt:screenOffset:animated: instead.
 @agssince{2.1, 10.2}
 */
-(void)showCalloutAt:(AGSPoint*)mapLocation pixelOffset:(CGPoint)pixelOffset animated:(BOOL)animated __attribute__((deprecated));

/** Moves the callout to the specified map location and point offset.
 @param mapLocation The location on the map to move to.
 @param screenOffset The offset from the map location to place the callout in screen points.
 @param animated Flag to determine if action should be animated.
 @agssince{10.2, 10.2}
 */
-(void)moveCalloutTo:(AGSPoint*)mapLocation screenOffset:(CGPoint)screenOffset animated:(BOOL)animated;

/** Shows the callout at the specified map location and point offset
 @param mapLocation The location on the map to move to.
 @param screenOffset The offset from the map location to place the callout in screen points.
 @param animated Flag to determine if action should be animated.
 @agssince{10.2, 10.2}
 */
-(void)showCalloutAt:(AGSPoint*)mapLocation screenOffset:(CGPoint)screenOffset animated:(BOOL)animated;

/** Show callout at specified location for a specific graphic. If the layer that the graphic belongs to contains a valid calloutDelegate (@c AGSHitTestable#calloutDelegate), it is given an opportunity to display information about the graphic in the callout via @c AGSLayerCalloutDelegate#callout:willShowForFeature:layer:mapPoint:
 Otherwise, the callout's @c #delegate, if it exists,  is given an opportunity through
 via @c AGSCalloutDelegate#callout:willShowForFeature:layer:mapPoint:
 @param mapPoint Map point that will be used for the callout. You can pass <code>nil</code> 
 if you want the center of the graphic to be used. If the graphic is represented 
 by a marker symbol, then the @p mapPoint is ignored in order to best place the 
 callout.
 @param graphic Graphic that the callout is displaying for.
 @param animated Determines whether or not the callout should animate when it is shown.
 @deprecated Deprecated at 10.2. Use @c AGSCallout#showCalloutAtPoint:forFeature:animated: instead.
 @agssince{10.1.1, 10.2}
 */
-(void)showCalloutAtPoint:(AGSPoint *)mapPoint forGraphic:(AGSGraphic*)graphic animated:(BOOL)animated __attribute__((deprecated));

/** Show callout at specified location for a specific feature. If the layer that the feature belongs to contains a valid calloutDelegate (@c AGSHitTestable#calloutDelegate), it is given an opportunity to display information about the feature in the callout via @c AGSLayerCalloutDelegate#callout:willShowForFeature:layer:mapPoint:
 Otherwise, the callout's @c #delegate, if it exists,  is given an opportunity through
 @c AGSCalloutDelegate#callout:willShowForFeature:layer:mapPoint:
 @param mapPoint Map point that will be used for the callout. You can pass <code>nil</code>
 if you want the center of the feature to be used. If the graphic is represented
 by a marker symbol, then the @p mapPoint is ignored in order to best place the
 callout.
 @param feature AGSFeature that the callout is displaying for.
 @param layer AGSLayer that the feature is in.
 @param animated Determines whether or not the callout should animate when it is shown.
 @return Value indicating whether or not the callout did actually show.
 @agssince{10.2, 10.2}
 */
-(BOOL)showCalloutAtPoint:(AGSPoint *)mapPoint forFeature:(id<AGSFeature>)feature layer:(AGSLayer<AGSHitTestable>*)layer animated:(BOOL)animated;

/** Shows the callout for the AGSLocationDisplay on the map.
 The callout's @c #delegate, if it exists, is given an opportunity to display information in the callout through
 @c AGSCalloutDelegate#callout:willShowForLocationDisplay:
 @return Value indicating whether or not the callout did actually show.
 @agssince{10.1.1, 10.2}
 */
-(BOOL)showCalloutForLocationDisplay;

/** Show callout at specified location
 @param mapLocation
 @param pixelOffset
 @param rotateOffsetWithMap
 @param animated
 @deprecated Deprecated at 10.2. Use @c AGSCallout#showCalloutAt:screenOffset:rotateOffsetWithMap:animated: instead.
 @agssince{10.1.1, 10.2}
 */
-(void)showCalloutAt:(AGSPoint*)mapLocation pixelOffset:(CGPoint)pixelOffset rotateOffsetWithMap:(BOOL)rotateOffsetWithMap animated:(BOOL)animated __attribute__((deprecated));

/** Move callout to the specified location
 @param mapLocation 
 @param pixelOffset
 @param rotateOffsetWithMap
 @param animated
 @deprecated Deprecated at 10.2. Use @c AGSCallout#moveCalloutTo:screenOffset:rotateOffsetWithMap:animated: instead.
 @agssince{10.1.1, 10.2}
 */
-(void)moveCalloutTo:(AGSPoint*)mapLocation pixelOffset:(CGPoint)pixelOffset rotateOffsetWithMap:(BOOL)rotateOffsetWithMap animated:(BOOL)animated __attribute__((deprecated));

/** Show callout at specified location
 @param mapLocation
 @param screenOffset
 @param rotateOffsetWithMap
 @param animated
 @agssince{10.2, 10.2}
 */
-(void)showCalloutAt:(AGSPoint*)mapLocation screenOffset:(CGPoint)screenOffset rotateOffsetWithMap:(BOOL)rotateOffsetWithMap animated:(BOOL)animated;

/** Move callout to the specified location
 @param mapLocation
 @param screenOffset
 @param rotateOffsetWithMap
 @param animated
 @agssince{10.2, 10.2}
 */
-(void)moveCalloutTo:(AGSPoint*)mapLocation screenOffset:(CGPoint)screenOffset rotateOffsetWithMap:(BOOL)rotateOffsetWithMap animated:(BOOL)animated;

/** Dismisses the callout.
 @agssince{10.1.1, 10.2}
 */
-(void)dismiss;

@end



#pragma mark -

/** @brief A delegate of @c AGSCallout.
 
 A protocol which must be adopted by a class wishing to control the behavior of displaying callout for features or the map's location display symbol. The delegate is also notified when a user 
 interacts with the callout window. An instance of the class must be set as @c AGSCallout#delegate.
 
 All of the methods of this protocol are optional.
 
 @define{AGSCallout.h, ArcGIS}
 @agssince{1.0, 10.2}
 */
@protocol AGSCalloutDelegate <NSObject>

@optional

/** Delegates should implement this method when they want to configure how a callout looks for a particular feature in a particular layer.
 Some properties delegates may want to configure are title, detail, image, customView, etc. The delegate should return YES for the callout to be shown. The delegate can return NO for those features for which a callout should not be shown. 
 This method will only be called if @c AGSHitTestable#calloutDelegate is not set.
 
 @param callout The callout that will show.
 @param feature The feature to display the callout for.
 @param layer The layer the feature belongs to.
 @param mapPoint The coordinates at which the graphic callout will be displayed.
 @return Value indicating whether or not the callout should actually show.
 @agssince{10.2, 10.2}
 */
-(BOOL)callout:(AGSCallout*)callout willShowForFeature:(id<AGSFeature>)feature layer:(AGSLayer<AGSHitTestable>*)layer mapPoint:(AGSPoint *)mapPoint;

/** Delegates should implement this method when they want to configure how a callout looks for the location display symbol.
 Some properties delegates may want to configure are title, detail, image, customView, etc. The delegate should return YES for the callout to be shown, or NO otherwise.
@param callout The callout that will show.
@param locationDisplay The locationDisplay to display the callout for.
@return Value indicating whether or not the callout should actually show.
@agssince{10.2, 10.2}
*/
-(BOOL)callout:(AGSCallout*)callout willShowForLocationDisplay:(AGSLocationDisplay*)locationDisplay;

/** Notifies the delegate that the callout will be dismissed.
 @agssince{10.2, 10.2}
 */
-(void)calloutWillDismiss:(AGSCallout*)callout;

/** Notifies the delegate that the callout was dismissed.
 @agssince{10.2, 10.2}
 */
-(void)calloutDidDismiss:(AGSCallout*)callout;

#if TARGET_OS_IPHONE

/** Tells the delegate the user tapped on the accessory button in the callout.
 You can check the @c AGSCallout#representedObject to find out what object the callout was being displayed for
 @param callout Callout containing accessory button.
 @agssince{10.1.1, 10.2}
 */
- (void)didClickAccessoryButtonForCallout:(AGSCallout *)callout;

#elif TARGET_OS_MAC && (!TARGET_OS_IPHONE)

/** Tells the delegate the user tapped on the callout.
 @param callout Callout that was clicked.
 @agssince{10.2, 10.2}
 */
-(void)calloutDidClick:(AGSCallout*)callout;

#endif



@end
