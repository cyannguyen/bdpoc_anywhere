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

#pragma mark -

@class AGSTimeExtent;
@class AGSTimeReference;

/** @file AGSTimeInfo.h */
/** @brief Time information details.
 
 Instances of this class represent time information of a layer. It contains various time related
 info for dealing with time-aware layers.
 
 @define{AGSTimeInfo.h, ArcGIS}
 @agssince{1.0, 10.2}
 */
@interface AGSTimeInfo : NSObject <AGSCoding>

/** The name of the attribute field that contains the start time information.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *startTimeField;

/** The name of the attribute field that contains the end time information.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *endTimeField;

/** The field that contains the trackId.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *trackIdField;

/** The time extent for all the data in the layer.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, strong, readonly) AGSTimeExtent *timeExtent;

/** Information about how the time was referenced.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, strong, readonly) AGSTimeReference *timeReference;

/** Time interval of the data in the layer.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, assign, readonly) double timeInterval;

/** Temporal unit in which the time interval is measured. Possible values 
 include
 
 @li @c AGSTimeIntervalUnitsCenturies
 @li @c AGSTimeIntervalUnitsDays
 @li @c AGSTimeIntervalUnitsDecades
 @li @c AGSTimeIntervalUnitsHours
 @li @c AGSTimeIntervalUnitsMilliseconds	
 @li @c AGSTimeIntervalUnitsMinutes	
 @li @c AGSTimeIntervalUnitsMonths
 @li @c AGSTimeIntervalUnitsSeconds
 @li @c AGSTimeIntervalUnitsUnknown	
 @li @c AGSTimeIntervalUnitsWeeks
 @li @c AGSTimeIntervalUnitsYears
 
 @agssince{1.0, 10.2}
 */
@property (nonatomic, assign, readonly) AGSTimeIntervalUnits timeIntervalUnits;

@end