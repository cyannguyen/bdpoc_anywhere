/*
 COPYRIGHT 2010 ESRI
 
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


@class AGSTextSymbol;

/** The placement of a label.
 @agssince{1.8, 10.2}
 */
typedef NS_ENUM(NSInteger, AGSLabelPlacement) {
	AGSLabelPlacementPointAboveCenter = 0,	/*!<  */
	AGSLabelPlacementPointBelowCenter,		/*!<  */
	AGSLabelPlacementPointCenterCenter,		/*!<  */
	AGSLabelPlacementPointAboveLeft,		/*!<  */
	AGSLabelPlacementPointBelowLeft,		/*!<  */
	AGSLabelPlacementPointCenterLeft,		/*!<  */
	AGSLabelPlacementPointAboveRight,		/*!<  */
	AGSLabelPlacementPointBelowRight,		/*!<  */
	AGSLabelPlacementPointCenterRight,		/*!<  */
	
	AGSLabelPlacementLineAboveAfter,		/*!<  */
	AGSLabelPlacementLineAboveStart,		/*!<  */
	AGSLabelPlacementLineBelowAfter,		/*!<  */
	AGSLabelPlacementLineBelowStart,		/*!<  */
	AGSLabelPlacementLineCenterAfter,		/*!<  */
	AGSLabelPlacementLineCenterStart,		/*!<  */
	
	AGSLabelPlacementLineAboveAlong,		/*!<  */
	AGSLabelPlacementLineAboveEnd,			/*!<  */
	AGSLabelPlacementLineBelowAlong,		/*!<  */
	AGSLabelPlacementLineBelowEnd,			/*!<  */
	AGSLabelPlacementLineCenterAlong,		/*!<  */
	AGSLabelPlacementLineCenterEnd,			/*!<  */
	
	AGSLabelPlacementLineAboveBefore,		/*!<  */
	AGSLabelPlacementLineBelowBefore,		/*!<  */
	AGSLabelPlacementLineCenterBefore,		/*!<  */
	
	AGSLabelPlacementPolygonAlwaysHorizontal		/*!<  */
	
} ;

/** @brief Represents labelling properties 
 
 Represents the properties of how a service should be labelled.
 @agssince{1.8, 10.2}
 */
@interface AGSLabelClass : NSObject <AGSCoding>

/** The placement of the label.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, assign, readonly) AGSLabelPlacement placement;

/** The expression that specifies what text is drawn in the label.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *labelExpression;

/** Specifies whether or not the labelling should use coded values.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, assign, readonly) BOOL useCodedValues;

/** The symbol that is used for this label class.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, strong, readonly) AGSTextSymbol *symbol;

/** The min scale that this label class should be used.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, assign, readonly) CGFloat minScale;

/** The max scale that this label class should be used.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, assign, readonly) CGFloat maxScale;

@end










