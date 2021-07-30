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
@class AGSSpatialReference;

/** @brief Abstract class, do not instantiate.
 
 @agssince{1.8, 10.2}
 */
@interface AGSNALayerInfoBase : NSObject <AGSCoding> {
 @private
	NSString *_layerName;
	AGSNALayerType _layerType;
	NSString *_impedance;
	NSArray *_restrictions;
	NSUInteger _snapTolerance;
	NSUInteger _maxSnapTolerance;
	AGSUnits _snapToleranceUnits;
	BOOL _ignoreInvalidLocations;
	AGSNAUTurn _uTurns;
	NSArray *_accumulateAttributeNames;
	NSArray *_attributeParameterValues;
	AGSSpatialReference *_outputSpatialReference;
    BOOL _useHierarchy;
}

/** The name of the network layer.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *layerName;

/** The type of the network layer.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, assign, readonly) AGSNALayerType layerType;

/** The default network attribute name to be used as the impedance attribute in analysis.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *impedance;

/** The default list of network attribute names to be used as restrictions with the analysis.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, copy, readonly) NSArray *restrictions;

/** The tolerance amount by which locations can be snapped to the underlying transportation network.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, assign, readonly) NSUInteger snapTolerance;

/** The maximum snap tolerance
 @agssince{1.8, 10.2}
 */
@property (nonatomic, assign, readonly) NSUInteger maxSnapTolerance;

/** Units in which #snapTolerance is specified
 @agssince{1.8, 10.2}
 */
@property (nonatomic, assign, readonly) AGSUnits snapToleranceUnits;

/** In routes where a stop is not located on a network or a stop could not be reached, 
 the results will differ depending on the value of #ignoreInvalidLocations.
 @li When <code>false</code>, the solve operation will fail if at least one of the
 stops specified cannot be located or reached.
 @li When <code>true</code>, as long as there are at least two valid stops that have
 been connected by a route, a valid result is returned. If multiple routes are 
 processed in a single request, as long as at least one route is build, a valid
 result is returned. The list of routes that cannot be solved is included in the
 message parameter of @c AGSRoute.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, assign, readonly) BOOL ignoreInvalidLocations;

/** Specifies the network layer's default value for how U-Turns should be handled.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, assign, readonly) AGSNAUTurn uTurns;

/** The default list of network attribute names to be accumulated with the analysis, 
 i.e. which attributes should be returned as part of the response.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, copy, readonly) NSArray *accumulateAttributeNames;

/** 
 Each element in the array is an object that describes the parameter values.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, copy, readonly) NSArray *attributeParameterValues;

/** The well-known ID of the spatial reference for the geometries returned with 
 the analysis results. If not specified, the geometries are returned in the spatial 
 reference of the map.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, strong, readonly) AGSSpatialReference *outputSpatialReference;

/** Indicates the network layer's default value for whether the hierarchy attribute 
 for the network should be used in analysis.
 @agssince{1.8, 10.2}
 */
@property (nonatomic, assign, readonly) BOOL useHierarchy;

@end
