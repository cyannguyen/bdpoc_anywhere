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

@class AGSPortal;
@protocol AGSPortalUserDelegate;

/** Notification that indicates that an @c AGSPortal successfully loaded.
 @agssince{10.2, 10.2}
 */
AGS_EXTERN NSString *const AGSPortalDidFetchPortalUserContentNotification;


/** @file AGSPortalUser.h */ //Required for Globals API doc

/** @brief An object representing a registered user of the portal or organization. 
 
 AGSPortalUser represents a registered user of a portal or organization. A Portal may have users who are
 unaffiliated with an organization or users who are part of an organization. Users sign in to the portal 
 and create and share content which is organized into Items (@c AGSPortalItem). Users can create and 
 join Groups (@c AGSPortalGroup) and share items with Groups. This makes the items visible and 
 accessible to other members of the Group. Users could be in different roles including administrators, 
 publishers and  information workers. Administrators can add  users to  their organizations and have 
 access to all content within the organization. All users can create web maps based  on mashing up 
 services that they have access to and can register services running on external servers. Publishers 
 within an organization can in addition create hosted services based on data files that they upload.
 
 @see AGSPortalUserDelegate
 @agssince{2.2, 10.2}
 */
@interface AGSPortalUser : NSObject <AGSCoding>

/** The delegate for the portal user operations. 
 @agssince{2.2, 10.2}
 */
@property (nonatomic, weak, readwrite) id<AGSPortalUserDelegate> delegate;

/** The portal that the user belongs to. 
 @agssince{2.2, 10.2}
 */
@property (nonatomic, weak, readonly) AGSPortal *portal;

/** Username of the user.
 @agssince{2.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *username;

/** Full name of the user.
 @agssince{2.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *fullName;

/** Description of the user, if exists. 
 @agssince{2.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *userDescription;

/** Email of the user
 @agssince{2.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *email;

/** The id of the organization if the user belongs to an organization. 
 @agssince{2.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *organizationId;

/** The file name of the thumbnail image of the user. 
 @agssince{2.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSString *thumbnailFileName;

/** Words or short phrases that describe the user.
 @agssince{2.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSArray *tags;

/** Groups that the user is a member of.
 @agssince{2.2, 10.2}
 */
@property (nonatomic, copy, readonly) NSArray *groups;

/**  Determines if other users can search for this user's name to find content and groups owned by this
 user and to invite this user to join their groups.  Can be @ AGSPortalAccessPrivate, @c AGSPortalAccessOrganization, or @c AGSPortalAccessPublic. 
 
 @c AGSPortalAccessPrivate implies the user is hidden and others cannot search for the user or view his/her information. @c AGSPortalAccessOrganization implies only members of the organization can search for or view the user's information. @c AGSPortalAccessPublic implies anyone can search for or access the user's information.
 @agssince{2.2, 10.2}
 */
@property (nonatomic, assign, readonly) AGSPortalAccess access;

/** The date on which the user account was created. 
 @agssince{2.2, 10.2}
 */
@property (nonatomic, strong, readonly) NSDate *created;

/** The date on which the user account was modified. 
 @agssince{2.2, 10.2}
 */
@property (nonatomic, strong, readonly) NSDate *modified;

/** The thumbnail image for the user.  This needs to be fetched explicitly using #fetchThumbnail. 
 @agssince{2.2, 10.2}
 */
@property (nonatomic, strong, readonly) AGSImage *thumbnail;

/** The role of the user within the organization.
 @agssince{10.1.1, 10.2}
 */
@property (nonatomic, assign, readonly) AGSPortalUserRole role;

/** The ID of the group that contains the user’s favorites.
 @since 10.2.2
 */
@property (nonatomic, copy, readonly) NSString *favoritesGroupID;

/** The units preference of the user.
 @since 10.2.3
 */
@property (nonatomic, assign, readonly) AGSPortalUserUnits units;

/** Kicks off an operation that fetches the user's content at the root level (meaning, not under any folder).The corresponding methods on @c AGSPortalUserDelegate are invoked when the operation completes successfully or encounters an error.
 @agssince{2.2, 10.2}
 */
-(NSOperation*)fetchContent;

/** Kicks off an operation that fetches the user's content within the specified folder. The corresponding methods on @c AGSPortalUserDelegate are invoked when the operation completes successfully or encounters an error.
 @param folderId The the id of the folder to fetch the content from. 
 @agssince{2.2, 10.2}
 */
-(NSOperation*)fetchContentInFolder:(NSString*)folderId;

/** Kicks off an operation to fetch a thumbnail image for the user. The corresponding methods on @c AGSPortalUserDelegate are invoked when the operation completes successfully or encounters an error.
 @agssince{2.2, 10.2}
 */
-(NSOperation*)fetchThumbnail;

/** Initializes a portal user with a portal and a username.
 @param portal The portal that the user belongs to. 
 @param username The username of the user. 
 @agssince{2.2, 10.2}
 */
-(id)initWithPortal:(AGSPortal*)portal username:(NSString*)username;

@end

/** @brief The delegate of @c AGSPortalUser
 
 A protocol which must be adopted by a class wishing to serve as a delegate for AGSPortalUser. 
 An instance of the
 class must then be set as @c AGSPortalUser#delegate .

 AGSPortalUser informs the delegate when operations complete successfully or encounter an error.
 
 All of the methods of this protocol are optional.
 
 @agssince{2.2, 10.2}
 */
@protocol AGSPortalUserDelegate <NSObject>
@optional

/** Tells the delegate that the portal user was loaded successfully.
 @param portalUser The portal user that was loaded. 
 @agssince{2.2, 10.2}
 */
-(void)portalUserDidLoad:(AGSPortalUser*)portalUser;

/** Tells the delegate that an error was encountered while tyring to load the portal user.
 @param portalUser 	The portal user that failed to load.
 @param error Information about the cause of the failure. 
 @agssince{2.2, 10.2}
 */
-(void)portalUser:(AGSPortalUser*)portalUser didFailToLoadWithError:(NSError*)error;

/** Tells the delegate that the content of the user has been fetched successfully. 
 @param portalUser 	The portal user for which the content was fetched.
 @param operation The operation that performed the fetch.
 @param items The array of @c AGSPortalItem that the user is the owner of.
 @param folders The array of folders inside the folder specified for the fetch. 
 @param folderId The folder specified in the fetch operation. 
 @agssince{2.2, 10.2}
 */
-(void)portalUser:(AGSPortalUser*)portalUser operation:(NSOperation*)operation didFetchContent:(NSArray*)items folders:(NSArray*)folders inFolder:(NSString*)folderId;

/** Tells the delegate that an error was encountered while tyring to fetch the content of the user.
 @param portalUser The portal user the error happened.
 @param op The operation that performed the fetch.
 @param folderId The folder specified in the fetch operation.
 @param error Information about the cause of the failure. 
 @agssince{2.2, 10.2}
 */
-(void)portalUser:(AGSPortalUser*)portalUser operation:(NSOperation*)op didFailToFetchContentInFolder:(NSString*)folderId withError:(NSError*)error;

/** Tells the delegate that  the user's thumbnail image was fetched successfully. 
 @param portalUser 	The portal user for which the thumbnail was fetched. 
 @param op The operation that performed the fetch. 
 @param thumbnail The thumbnail image file.
 @agssince{2.2, 10.2}
 */
-(void)portalUser:(AGSPortalUser*)portalUser operation:(NSOperation*)op didFetchThumbnail:(AGSImage*)thumbnail;

/** Tells the delegate that an error was encountered while tyring to fetch the user's thumbnail image. 
 @param portalUser 	The portal user for which the thumbnail was fetched. 
 @param op The operation that performed the fetch. 
 @param error Information about the cause of the failure.
 @agssince{2.2, 10.2}
 */
-(void)portalUser:(AGSPortalUser*)portalUser operation:(NSOperation*)op didFailToFetchThumbnailWithError:(NSError*)error;
@end
