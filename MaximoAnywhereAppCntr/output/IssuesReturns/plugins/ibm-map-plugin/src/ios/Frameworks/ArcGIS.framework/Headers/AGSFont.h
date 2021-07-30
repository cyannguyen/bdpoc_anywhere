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

/** @file AGSColor.h */ //Required for Globals API doc


#if TARGET_OS_IPHONE
/** AGSFont is defined as UIFont on iOS platform.
 @agssince{10.2, 10.2}
 */
#define AGSFont UIFont
#elif TARGET_OS_MAC && !TARGET_OS_IPHONE
/** AGSFont is defined as NSFont on Mac OS X platform.
 @agssince{10.2, 10.2}
 */
#define AGSFont NSFont
#endif
