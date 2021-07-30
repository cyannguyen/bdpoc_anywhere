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

@class AGSCredential;
@protocol AGSSecuredResource;

/** @file AGSTask.h */ //Required for Globals API doc

/** @brief Base class for all ArcGIS task objects
 
 Base class to hold common objects among ArcGIS tasks. You should never
 instantiate an <code>%AGSTask</code> object directly.
 
 @see @concept{tasks-overview.htm, Overview of Tasks}
 @agssince{1.0, 10.2}
 */
@interface AGSTask : NSObject <AGSSecuredResource>

/** URL to a task resource in the ArcGIS Server REST Services Directory.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, copy, readonly) NSURL *URL;

/** The credential to be used to access secured resources.
 @agssince{1.0, 10.2}
 */
@property (nonatomic, copy, readwrite) AGSCredential *credential;

/** The credential cache to be used for this resource.
 @agssince{10.1.1, 10.2}
 */
@property (nonatomic, strong, readwrite) AGSCredentialCache *credentialCache;

/** The cache policy that should be used for making the web request.
 Default value is NSURLRequestUseProtocolCachePolicy
 @agssince{10.1.1, 10.2}
 */
@property (nonatomic, assign, readwrite) NSURLRequestCachePolicy requestCachePolicy;

/** The timeout interval (in seconds) for this request. Default value is 60.
 @agssince{10.1.1, 10.2}
 */
@property (nonatomic, assign, readwrite) NSTimeInterval timeoutInterval;

/** Initialize the task.
 @param url URL to a task resource in the ArcGIS Server REST Services Directory.
 @return A new task object.
 @agssince{1.0, 10.2}
 */
- (id)initWithURL:(NSURL *)url;

/** Initialize the task with a URL and credential to a secured resource.
 @param url URL to a task resource in the ArcGIS Server REST Services Directory.
 @param cred <code>AGSCredential</code> used to access secure resource.
 @return A new task object.
 @agssince{1.0, 10.2}
 */
- (id)initWithURL:(NSURL *)url credential:(AGSCredential*)cred;

@end



/** @brief A category on @c AGSTask to manage asynchronous server jobs
 
 A category on @c AGSTask to manage asynchronous server jobs represented by @c AGSResumableTaskJob, for example,
 those performed by @c AGSExportTileCacheTask or @c AGSGDBSyncTask
 
 @see @sample{e830608c5cba45309d7f1b1fe812848f, Download Tile Cache }
 @see @sample{a90b40f537e84e3aa1c36b10bd2c7c4d, Offline Feature Editing}
 @since 10.2.2
 */
@interface AGSTask (AsyncServerJobs)

#if TARGET_OS_IPHONE
/** Provides a way to check the status of all pending async server jobs while the app is in the background. If any job is complete, it  will also
 initiate the download in the background.
 
 This method should be called in the <code>-[UIApplicationDelegate application:performFetchWithCompletionHandler:]</code> delegate method.
 @note Only applicable to iOS 7 or later. You will need to enable the "background fetch" capability at your application level in order to take advantage of this method while your app has been suspended.
 @see @c AGSURLSessionManager#setBackgroundURLSessionCompletionHandler:forIdentifier: to handle downloads in background
 @since 10.2.2
 @see @sample{e830608c5cba45309d7f1b1fe812848f, Download Tile Cache }
 @see @sample{a90b40f537e84e3aa1c36b10bd2c7c4d, Offline Feature Editing}
 */
+(void)checkStatusForAllResumableTaskJobsWithCompletion:(void (^)(UIBackgroundFetchResult result))completion;
#endif

/** Returns a dictionary of all active resumable jobs. The key will be the jobType and the value will be an array of resumeIDs.
 @since 10.2.2
 */
+(NSDictionary*)activeResumeIDs;

/** Returns <code>YES</code> if the job with the specified @p resumeID is still valid.
 @since 10.2.2
 */
+(BOOL)isActiveResumeID:(NSString*)resumeID;

/** Cancels the job with the associated resumeID.
 @param resumeID The resume ID of the job to be canceled.
 @since 10.2.2
 */
-(void)cancelResumableTaskJobWithResumeID:(NSString*)resumeID;

@end


