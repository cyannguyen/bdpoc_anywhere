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



@class AGSSymbol;

/** @file AGSSimpleLineSymbol.h */ //Required for Globals API doc

#pragma mark -

/** Permissible styles for a line symbol.
 @agssince{1.0, 10.2}
 */
typedef NS_ENUM(NSInteger, AGSSimpleLineSymbolStyle) {
    AGSSimpleLineSymbolStyleDash = 0,		/*!<  */
    AGSSimpleLineSymbolStyleDot,			/*!<  */
    AGSSimpleLineSymbolStyleDashDot,		/*!<  */
    AGSSimpleLineSymbolStyleDashDotDot,		/*!<  */
    AGSSimpleLineSymbolStyleInsideFrame,	/*!<  */	
    AGSSimpleLineSymbolStyleNull,			/*!<  */
    AGSSimpleLineSymbolStyleSolid			/*!<  */
} ;



#pragma mark -

/** @brief A line symbol based on simple patterns.
 
 Instances of this class represent simple line symbols. Symbols describe how 
 graphics look on the map. Different symbols are used for graphics with different 
 geometry types. Line symbols are used to display those graphics which are based 
 on a polyline geometry. Simple line symbols display graphics using predefined 
 line style patterns such as solid, dash, dot, etc. 
 
 @define{AGSSimpleLineSymbol.h, ArcGIS}
 @agssince{1.0, 10.2}
 */

@interface AGSSimpleLineSymbol : AGSSymbol

/** The line style. Possible values include
 
 @li @c AGSSimpleLineSymbolStyleDash
 @li @c AGSSimpleLineSymbolStyleDot
 @li @c AGSSimpleLineSymbolStyleDashDot
 @li @c AGSSimpleLineSymbolStyleDashDotDot
 @li @c AGSSimpleLineSymbolStyleInsideFrame
 @li @c AGSSimpleLineSymbolStyleNull
 @li @c AGSSimpleLineSymbolStyleSolid
 
 Default is AGSSimpleLineSymbolStyleSolid.
 @agssince{1.0, 10.2}
 */
@property (nonatomic) AGSSimpleLineSymbolStyle style;

/** Width of line symbol in points. Default is 1.0.
 @agssince{1.0, 10.2}
 */
@property (nonatomic) CGFloat width;

/** Initialize autoreleased symbol with defaults.
 @return A new, autoreleased, simple line symbol object.
 @agssince{1.0, 10.2}
 */
+ (id)simpleLineSymbol;

/**
 @agssince{1.8, 10.2}
 */
-(id)initWithColor:(AGSColor*)color;

/**
 @agssince{1.8, 10.2}
 */
-(id)initWithColor:(AGSColor*)color width:(CGFloat)width;

/** Initialize autoreleased symbol with specified properties.
 @param color A color for the line
 @return A new, autoreleased, simple line symbol object.
 @agssince{1.8, 10.2}
 */
+(AGSSimpleLineSymbol*)simpleLineSymbolWithColor:(AGSColor*)color;

/** Initialize autoreleased symbol with specified properties.
 @param color A color for the line
 @param width The width of the line
 @return A new, autoreleased, simple line symbol object.
 @agssince{1.8, 10.2}
 */
+(AGSSimpleLineSymbol*)simpleLineSymbolWithColor:(AGSColor *)color width:(CGFloat)width;

@end