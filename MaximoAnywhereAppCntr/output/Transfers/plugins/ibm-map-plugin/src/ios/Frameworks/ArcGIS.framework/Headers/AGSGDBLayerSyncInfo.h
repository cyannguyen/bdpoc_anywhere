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

@protocol AGSCoding;

//
// this object represents a layer to be synced for a per-layer replica

/** @file AGSGDBLayerSyncInfo */ //Required for Globals API doc

/** @brief Sync parameters for a layer
 
 The class holds sync parameters for an individual layer in a sync-enabled geodatabase that use the @c AGSGDBSyncModelPerLayer sync model
 
 @define{AGSGDBLayerSyncInfo.h, ArcGIS}
 @agssince{10.2, 10.2}
 */
@interface AGSGDBLayerSyncInfo : NSObject<AGSCoding, NSCoding>

/** The ID of the layer
 @since 10.2
 */
@property (nonatomic, assign) NSInteger layerID;

/** The direction in which to sync changes.
 @since 10.2
 @note AGSGDBSyncDirectionBidirectional and AGSGDBSyncDirectionUpload options require a standard license for deployment.
 */
@property (nonatomic, assign) AGSGDBSyncDirection syncDirection;
@end
