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

@class AGSGDBGeodatabase;
@class AGSEditResult;

/** @file AGSGDBTransaction.h */ //Required for Globals API doc

/** @brief A transaction for a local geodatabase.
 
 @define{AGSGDBTransaction.h, ArcGIS}
 
 Instances of this class represent a transaction in a local geodatabase.
 
 A transaction is an application-defined unit of work performed against a database. A transaction starts,
 modifications are made against the database, then the transaction is committed or aborted. Once the
 transaction is committed, the changes made by the transaction need to be applied to the server in order to
 become visible to other users and applications (see @c AGSGDBSyncTask for more information on syncing).
 
 Transactions have the following standard "ACID" properties:
 
 Atomic—A transaction exhibits all-or-nothing behavior. If it is committed, all of its changes apply to the database.
 If it is aborted, none of its changes apply.
 
 Consistent—A transaction leaves the database in a consistent state.
 
 Isolation—A transaction can isolate its changes from other user's transactions until it commits and syncs them. Other users do not
 see the work internal to the transaction while it is in progress.
 
 Durable—Once a transaction commits, its results are persistent.

 @agssince{10.2, 10.2}
 */
@interface AGSGDBTransaction : NSObject

/** Create and start a transaction object for a local geodatabase.  Multiple transaction objects can be created for a single
 geodatabase, but second and subsequent transactions are 'nested' in previous transactions.  See @c #commit:
 and @c #abort: for more information.
 @param geodatabase to use for the transaction
 @return A handle to the transaction object
 @since 10.2
 */
+(instancetype)startTransactionForGeodatabase:(AGSGDBGeodatabase*)gdb;

/** Commit the changes to the geodatabase.  The changes will still need to be applied to the server.
 See @c AGSGDBSyncTask for information on syncing geodatabase changes.  Once you commit a transaction, you can no
 longer use that transaction and must create another if you want to continue using transaction-based edits.
 
 A note about mutliple transactions for a single geodatabase: commiting changes in a transaction will commit
 changes in any transactions created after the current transaction.
 @param error Returned if an error is encountered during the commit.  Only valid if the return result = NO.
 @return Value indicating whether or not the commit succeeded.
 @since 10.2
 */
-(BOOL)commit:(NSError **)error;

/** Abort and discard the changes to the geodatabase.  The changes will be removed and can no longer be
 applied to the server.  Once you abort a transaction, you can no longer use that transaction and must
 create another if you want to continue using transaction-based edits.
 
 A note about mutliple transactions for a single geodatabase: aborting changes in a transaction will abort
 changes in any transactions created after the current transaction.
 @param error Returned if an error is encountered during the commit.  Only valid if the return result = NO.
 @return Value indicating whether or not the abort succeeded.
 @since 10.2
 */
-(BOOL)abort:(NSError **)error;

@end
