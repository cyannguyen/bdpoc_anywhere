/*
 COPYRIGHT 2011 ESRI
 
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




@protocol AGSCoding;

@class AGSGraphic;

/** @brief A single maneuver in a series of driving direction.
 
 Instances of this class represent an individual maneuver in a series of turn-by-turn driving directions. 
 
 @agssince{1.8, 10.2}
 */
@interface AGSDirectionGraphic : AGSGraphic <AGSCoding>

/** The length of the direction. 
 @agssince{1.8, 10.2}
 */
@property (nonatomic, readonly) double length;

/** The time to complete the direction.
 @agssince{1.8, 10.2}
 @deprecated Deprecated at 10.2. Please use @c AGSDirectionGraphic#timeMinutes instead.
 */
@property (nonatomic, readonly) double time __attribute__((deprecated));

/** The time in minutes to complete the direction.
 @agssince{10.2, 10.2}
 */
@property (nonatomic, readonly) double timeMinutes;

/** The text that describes the direction.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *text;

/** The estimated time of arrival after upon completion of the direction.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, copy, readonly) NSDate *ETA;

/** The type of maneuver required to complete the direction.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, readonly) AGSNADirectionsManeuver maneuverType;

/** Array of @c AGSNADirectionsStrings objects that give more verbose information regarding
 the current direction.
 @avail{10.1}
 @agssince{2.3, 10.2}
 */
@property (nonatomic, copy, readonly) NSArray *directionsStrings;

/** Array of @c AGSDirectionEvent objects that give more verbose information regarding
 the current direction.
 @avail{10.1}
 @agssince{10.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSArray *events;


@end
