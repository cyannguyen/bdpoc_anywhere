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

@class AGSEnvelope;

/** @brief A spatial bookmark in a web map
 
 Instances of this class represent spatial bookmarks in a web map.
 @agssince{2.0, 10.2}
 */
@interface AGSWebMapBookmark : NSObject <AGSCoding>

/** The geographic location of the bookmark.
 @agssince{2.0, 10.2}
 */
@property (nonatomic, strong, readwrite) AGSEnvelope *extent;

/** The name of the bookmark.
 @agssince{2.0, 10.2}
 */
@property (nonatomic, copy, readwrite) NSString *name;

@end
