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

@class AGSEnvelope;
@class AGSLOD;
@class AGSPoint;
@class AGSSpatialReference;

/** @file AGSTileInfo.h */ //Required for Globals API doc

/** @brief The tiling scheme of an @c AGSTiledLayer.
 
 This object represents the tiling scheme used by a cached map service. For 
 example, ArcGIS Server cached map service, Bing Maps, etc. The tiling scheme 
 contains information about how a map is broken up into tiles of images and how 
 a client can use these tiles to display a map.
 
 @define{AGSTileInfo.h, ArcGIS}
 @agssince{1.0, 10.2}
 */
@interface AGSTileInfo : NSObject <AGSCoding>

/** The Dots-Per-Inch (DPI) resolution of tiled images.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, readonly) NSUInteger dpi;

/** The format of tiled images. Valid values are png8, png24, png32, and jpg.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *format;

/** Dimensions (in pixels) of tiled images.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, readonly) CGSize tileSize;

/** Array of @c AGSLOD objects representing the scale levels (Levels of Detail) 
 in the tiling scheme.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, copy, readonly) NSArray *lods;

/** The tiling scheme origin.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, strong, readonly) AGSPoint *origin;

/** The spatial reference of the tiling scheme.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, strong, readonly) AGSSpatialReference *spatialReference;

/** For each level of detail in the tiling scheme, compute start/end column/row.
 @param envelope The envelope of service to compute tile bounds.
 @agssince{1.0, 10.2}
 */
- (void)computeTileBounds:(AGSEnvelope *)envelope;

/** Get an envelope that represents the extent of a given tile.
 @param level The level of detail of the tile.
 @param row The row index of the tile.
 @param column The column index of the tile.
 @return envelope The envelope that covers the tile.
 @agssince{1.0, 10.2}
 */
- (AGSEnvelope *)envelopeForTileAtLevel:(NSInteger)level row:(NSInteger)row column:(NSInteger)column;

/** Get an envelope that represents the extent of a given tile.
 @param lod The level of detail of the tile.
 @param row The row index of the tile.
 @param col The column index of the tile.
 @return envelope The envelope that covers the tile.
 @agssince{2.0, 10.2}
 */
-(AGSEnvelope*)envelopeForTileAtLOD:(AGSLOD*)lod row:(NSInteger)row column:(NSInteger)col;

/** Initializes an @c AGSTileInfo object.
 @param dpi The dots per inch of the tiles to be requested.
 @param format The format of the tiled images.
 @param lods The levels of detail representing the scale levels in the tiling scheme.
 @param origin The origin of the tile.
 @param spatialReference The spatial reference of the tile to be requested.
 @param tileSize The size of the tile to be requested.
 @return An initialized <code>%AGSTileInfo</code> object.
 @agssince{1.0, 10.2}
 */
-(id)initWithDpi: (NSUInteger)dpi format: (NSString*)format lods: (NSArray*) lods origin:(AGSPoint *)origin spatialReference: (AGSSpatialReference*)spatialReference tileSize: (CGSize)tileSize;
@end
