/*
 * Licensed Materials - Property of IBM
 * "Restricted Materials of IBM"
 *
 * 5725-M39
 *
 * (C) COPYRIGHT IBM CORP. 2013,2020 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp. 
 *
 */

define("platform/model/PushingCoordinatorService",
["dojo/Deferred",
 "dojo/_base/lang",
 "dojo/_base/array", 
 "platform/exception/PlatformRuntimeException",
 "platform/store/PersistenceManager",
 "dojo/promise/all",
 "platform/util/PlatformConstants",
 "platform/comm/CommunicationManager",
 "platform/store/_TransactionIdGenerator",
 "platform/util/runOrRejectWithError",
 "platform/store/_JsonTranslationMixin",
 "platform/store/_ResourceMetadataContext",
 "platform/comm/HTTPHelper",
 "platform/util/CompressionHelper",
 "platform/model/ModelData",
 "platform/logging/TransactionLogger",
 "platform/store/StoreLock",
 "platform/translation/MessageService",
 "dojox/html/entities",
 "platform/store/SystemProperties"], 
function(Deferred, lang, arrayUtil, PlatformRuntimeException, 
		PersistenceManager, all, PlatformConstants, CommunicationManager, TransactionIdGenerator, 
		runOrRejectWithError, OslcJsonTranslator, ResourceMetadataContext, HTTPHelper, 
		CompressionHelper, ModelData, Logger, StoreLock, MessageService, Html, SystemProperties) {	
	var _promotingActive = {};
	var _flushingActive = false;	
	var _flushPromise = null;
	var processing_transactions = {};

	return {
/**@memberOf platform.model.PushingCoordinatorService */
		CLAZZ: 'platform.model.PushingCoordinatorService',
		
		flush: function(){
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, 'flush');
			Logger.trace("[SYNCHRO] BEGIN FLUSH...", null, this.CLAZZ);
			var deferred = new Deferred();
			var self = this;
			
			if (!_flushingActive){
				_flushPromise = deferred.promise;
			}
			// Try to first flush any stage records
			this._flushStageTransactions().then(function(){
				Logger.trace("[SYNCHRO] FLUSH STAGE TRANSACTIONS COMPLETED!", null, clazzmethod);
				// and then flush transactions
				var txnPromise = new Deferred();
				self._flushTransactions(txnPromise).then(function(){
					Logger.trace("[SYNCHRO] FLUSH TRANSACTIONS COMPLETED!", null, clazzmethod);
					deferred.resolve();
					if (!_flushingActive){
						
						_flushPromise = null;
					}
					
				}).otherwise(function(error){
					Logger.error("[SYNCHRO] FLUSH TRANSACTIONS FAILED!", null, clazzmethod);
					Logger.errorJSON("[SYNCHRO] ERROR: ", error, clazzmethod);
					deferred.reject(error);
					if (!_flushingActive){
						
						_flushPromise = null;
					}
				});
				
			}).otherwise(function(error){
				Logger.error("[SYNCHRO] FLUSH STAGE TRANSACTIONS FAILED!", error, clazzmethod);
				Logger.errorJSON("[SYNCHRO] ERROR: ", error, clazzmethod);
				deferred.reject(error);
				if (!_flushingActive){
					
					_flushPromise = null;
				}
			});
			return deferred.promise;
		},
		
		ensureFlushComplete: function(){
			var deferred = new Deferred();
			if (_flushingActive){
				if (_flushPromise) {
					_flushPromise.then(function(){
						deferred.resolve();
					}).otherwise(function(error){
						deferred.reject(error);
					});
				} else {
					deferred.resolve();
				}
			}
			else{
				this.flush().then(function(){
					deferred.resolve();
				}).otherwise(function(error){
					deferred.reject(error);
				});
			}
			return deferred.promise;
		},
		
		queueTransactionOfRecords: function(resourceName, id, dataArray){
			
			var deferred = new Deferred();
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, 'queueTransactionOfRecords');
			var self = this;
			return runOrRejectWithError(this, function(){
				Logger.timerStart("[SYNCHRO] Queueing Transaction Of Records [" + resourceName + "] id: [" + id + "]");
				PersistenceManager.getTransactionRecordOf(resourceName, id).then(function(dataList){
					var transaction = dataList.length == 0 ? self._generateTransactionRecord(resourceName, id) : dataList[0];	
					self._updateModificationDateOnTransaction(transaction);
					self._appendNewSubTransactions(transaction, dataArray);
					Logger.traceJSON("[SYNCHRO] Saving [" + resourceName + "] id: [" + id + "] Transaction: " , transaction, clazzmethod);
					PersistenceManager.saveTransactionRecord(transaction).then(function(){
						Logger.timerEnd("[SYNCHRO] Queueing Transaction Of Records [" + resourceName + "] id: [" + id + "]");
						deferred.resolve();
						self = null;
						dataArray = null;
					}).otherwise(function(error){
						Logger.error("[SYNCHRO] Error saving transaction of [" + resourceName + "] id: [" + id + "]", null, clazzmethod);
						Logger.errorJSON("[SYNCHRO] ERROR: ", error, clazzmethod);
						deferred.reject(error);
						self = null;
						dataArray = null;
					});	
					
				}).otherwise(function(error){
					Logger.error("[SYNCHRO] Could not find transaction of record  [" + resourceName + "] id: [" + id + "]", null, clazzmethod);
					Logger.errorJSON("[SYNCHRO] ERROR:", error, clazzmethod);
					deferred.reject(error);
					self = null;
					dataArray = null;
				});
				return deferred.promise;
			});
		},
		stageTransactionsOfRecords: function(modelDataArray){				
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, 'stageTransactionsOfRecords');
			var self = this;
			Logger.trace("[PUSHING] BEGIN stageTransactionsOfRecords.", null, clazzmethod);;
			return all(arrayUtil.map(modelDataArray, lang.hitch(this, this.stageTransactionOf))).then(function(){
				Logger.trace("[PUSHING] stageTransactionsOfRecords COMPLETED!!!!!.", null, clazzmethod);;
			}).otherwise(function(error){
				Logger.logError("[PUSHING] stageTransactionsOfRecords errored. Error:", error, clazzmethod);
			});
		},
		stageTransactionOf: function(modelData){
			var deferred = new Deferred();
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, 'stageTransactionOf');
			return runOrRejectWithError(this, function(){				
			
				var resourceName = modelData.getMetadata().getResourceName();
				var id = modelData.getId();			
				Logger.timerStart("[PUSHING] Staging transactions [" + resourceName + "] id: [" + id + "]");
				var toStage = arrayUtil.map(modelData._getClosedTransactions(), function(subTransaction){
					var transaction = this._generateTransactionRecord(resourceName, id);
					this._updateCreateDateOnStaged(transaction);
					this._addPayloadToStagedTransaction(transaction, subTransaction);
					return transaction;
				}, this);								
				var self = this;
				
				if(toStage && toStage.length > 0){
					Logger.traceJSON("[STAGING] Staging transaction for ["+resourceName+"] id: ["+id+"]" + " Transaction: ", toStage, null, clazzmethod);;
					if(arrayUtil.some(toStage, function(transaction){ return (!transaction.storeId || transaction.storeId.length == 0);})){
						Logger.error("[STAGING] ERROR NO ID: cannot Stage transaction for ["+resourceName+"] id: ["+id+"]", null, clazzmethod);;
						deferred.reject("Could not stage transaction because the transaction doesn't have a storeId.");
					}
					else{
						modelData._stagingCleanUp();
						PersistenceManager.stageTransactionRecord(toStage).then(function(){
							Logger.timerEnd("[PUSHING] Staging transactions [" + resourceName + "] id: [" + id + "]");
						
							//StageTransaction should do what its supposed to do. Other stuff dealt by flush() execution line
							//Code below was written possibly because ModelDataSet cuts in PCS calling stageRecords. ModelDataset calls a flush after... which it should rely on.
							self.promoteTransactionsToPush(resourceName, id).then(function() {
							deferred.resolve();
						}).otherwise(function(error){
							deferred.reject(error);
						});
					}).otherwise(function(error){
							Logger.logError("[PUSHING] Error Staging transactions for [" + resourceName + "] id: [" + id + "]", error, clazzmethod);
						deferred.reject(error);
					});				
						
					}
				}else{
					deferred.resolve();
				}
				return deferred.promise;
			});
		},
		_generateTransactionRecord: function(resourceName, resourceId){
			var resourceIdToCheck = resourceId;
			if ( (typeof resourceId === 'number') || resourceId.indexOf("<") < 0){
				resourceIdToCheck = "<" + resourceId + ">";
			}
			return {
				"resourceName" : resourceName, 
				"storeId" : resourceIdToCheck				
			};
		},
		_updateCreateDateOnStaged: function(transaction){						
			transaction["creationDate"] = new Date().getTime();			
		},
		_putTransactionInErrorState: function(transaction){						
			transaction["json"]["isInError"] = true;			
		},
		_clearTransactionFromErrorState: function(transaction){						
			transaction["json"]["isInError"] = false;			
		},
		_isTransactionInErrorState: function(transaction){
			return transaction["json"]["isInError"] || false;
		},
		_updateModificationDateOnTransaction: function(transaction){			
			if(transaction["json"]){
				transaction["json"]["lastModification"] = new Date().getTime();
			}
			else{
				transaction["lastModification"] = new Date().getTime();
			}
		},
		_appendNewSubTransactions: function(transaction, stagedTransactions){
			Logger.trace("[PUSHING] Appending staged transactions to current transaction", null, this.CLAZZ);;
			var self = this;
			var data = (transaction["json"]) ? transaction["json"] : transaction; 
			
			var existingList = data["payload"] || [];

			arrayUtil.forEach(stagedTransactions, function(subTransaction){
				
				existingList.push(self._convertIntoMergeable(subTransaction["json"]));
			});
			data["payload"] = existingList;
			Logger.traceJSON("[PUSHING] resulting payload: ", existingList, null, this.CLAZZ);;
		},
		_convertIntoMergeable: function(subTransaction){
			// keeps the information in the internal format as it is easier to manipulate it
			// during merges - we only format it to oslc format when we are actually sending a request
			// the oslc format is transient from the pushing standpoint.
			var converted = {};
			for(var key in subTransaction["payload"]){				
				converted[key] = subTransaction["payload"][key];				
			}
			converted["transactionid"] = TransactionIdGenerator.newTransactionId();	
			converted["__transactionDate__"] = new Date();
			converted["hasDeletion"] = subTransaction["hasDeletion"];
			return converted;
		},
		_addPayloadToStagedTransaction: function(transaction, subTransaction){
			delete subTransaction["__isOpen"];
			transaction["payload"] = subTransaction;
			transaction["hasDeletion"] = arrayUtil.some(Object.keys(subTransaction), function(transactionKey){
				var value = subTransaction[transactionKey];
				return (value && lang.isObject(value) && !!value._hasRecordsToDelete);
			});
		},
		promoteTransactionsToPush: function(resourceName, resourceId){
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, 'promoteTransactionsToPush');
			Logger.trace("[SYNCHRO] About to promote staged transactions of ["+resourceName+"] id: ["+resourceId+"]", null, this.CLAZZ);
			Logger.traceJSON("[SYNCHRO] Active promoting: ", _promotingActive, this.CLAZZ);
			var deferred = new Deferred();
			var self = this;
			if(!_promotingActive[resourceName + "-" + resourceId]){
				_promotingActive[resourceName + "-" + resourceId] = true;							
				return runOrRejectWithError(this, function(){
					var self = this;
					PersistenceManager.getTransactionRecordOf(resourceName, resourceId).then(function(transaction) {
						
						if(transaction.length > 0){
							Logger.traceJSON("[SYNCHRO] Existing Transaction for [" + resourceName + "] id: [" + resourceId + "]", transaction, clazzmethod);
						}
						// If the transaction queue is locked for updates, because it is being sent to the server
						// or waiting for response from server, we cannot make any updates.
						// In case there is no transaction or no lock on the transaction for this resourceid, then
						// we can push the staged records into the transaction queue.
						if ((transaction.length == 0) || (!transaction[0].json[PlatformConstants.TRANSACTION_LOCK_FORUPDATE]))
						{
							Logger.timerStart("[SYNCHRO] PromotingTransactions [" + resourceName + "] id: [" + resourceId + "]");
							PersistenceManager.getStagedTransactionRecordOf(resourceName, resourceId).then(function(stagedTransactions){								
								Logger.setLevel(2);
								Logger.traceJSON("[SYNCHRO] Fetched staged transactions for record [" + resourceName + "] id: [" + resourceId + "] Transactions: ", stagedTransactions, clazzmethod);
								if(stagedTransactions.length > 0){
									self.queueTransactionOfRecords(resourceName, resourceId, stagedTransactions).then(function(){
										var removePromiseList = [];

										arrayUtil.forEach(stagedTransactions, function(stagedTransaction){
											var removePromise = PersistenceManager.removeStagedTransaction(stagedTransaction);
											removePromiseList.push(removePromise);
										});

										all(removePromiseList).then(function(result) {
											Logger.timerEnd("[SYNCHRO] PromotingTransactions [" + resourceName + "] id: [" + resourceId + "]");
											delete _promotingActive[resourceName + "-" + resourceId];
											self.promoteTransactionsToPush(resourceName, resourceId).then(function(){
												deferred.resolve();
											}).otherwise(function(error){
												deferred.reject(error);
											});
										}).otherwise(function(error){
											Logger.error("[SYNCHRO] Error removing staged transaction of [" + resourceName + "] id: [" + resourceId + "]", null, clazzmethod);
											Logger.errorJSON("[SYNCHRO] ERROR: ", error, clazzmethod);
											deferred.reject(error);
										});	
									}).otherwise(function(error){
											deferred.reject(error);
									});
								}else{
									delete _promotingActive[resourceName + "-" + resourceId];
									//Maybe flush assuming someone is cutting into promoteTransaction to Push instead of flush() execution line
									//If flush initated then it will do all necessary stuff.
									
									//self.flush(logObject).always(function(){	
									//	logObject.registerCall("promoteTransactionsToPush^:self.flush.always");
									//	console.log("INFXUI1001X101X24: Finished Calling flush");
									//	Logger.timerEnd("[PUSHING] PromotingTransactions [" + resourceName + "] id: [" + resourceId + "]");
									deferred.resolve();
									//});
								}
							}).otherwise(function(error){
								Logger.error("[SYNCHRO] Error calling PersistenceManager.getStagedTransactionRecordOf for [" + resourceName + "] id: [" + resourceId + "]", null, clazzmethod);
								Logger.errorJSON("[SYNCHRO] ERROR: ", error, clazzmethod);
								deferred.reject(error);
							});					

						}
						else if ((transaction.length > 0) && (transaction[0].json[PlatformConstants.TRANSACTION_LOCK_FORUPDATE]))
						{
							Logger.trace("[SYNCHRO] Pending transactions are in locked state for ["+resourceName+"] id: ["+resourceId+"]", null, clazzmethod);
							delete _promotingActive[resourceName + "-" + resourceId];
							deferred.resolve();
							return deferred.promise;
						}
					});
					
					return deferred.promise;
				}).always(function(){
					delete _promotingActive[resourceName + "-" + resourceId];
					
				});
			}
			else{
				Logger.trace("[SYNCHRO] Someone is already promoting staged transactions of ["+resourceName+"] id: ["+resourceId+"]", null, clazzmethod);
				deferred.resolve();
				return deferred.promise;
			}
		},
		// Flush stage records to transaction queue
		_flushStageTransactions: function() {
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, '_flushStageTransactions');
			// Pick one transaction at a time and then promote that to be pushed to the
			// transaction queue.
			var alreadyProcessedList = {};
			var self = this;
			var deferred = new Deferred();
			var promotePromises = new Array();
			
			PersistenceManager.getStageTransactionRecords().then(function(stagedTransactions){
				Logger.traceJSON("[SYNCHRO] Staged transactions: ", stagedTransactions, clazzmethod);
				arrayUtil.forEach(stagedTransactions, function(stagedTransaction){	
					var resourceName = stagedTransaction.json.resourceName;
					var resourceId = self._resourceIdToJSONStoreId(stagedTransaction.json.storeId);
					if (!alreadyProcessedList[resourceName + '_' + resourceId])
					{
						promotePromises.push(self.promoteTransactionsToPush(resourceName, resourceId));
						alreadyProcessedList[resourceName + '_' + resourceId] = true;
					}
				});

				all(promotePromises).then(function(){
					deferred.resolve();
				}).otherwise(function(error){
					deferred.reject(error);
				});
			}).otherwise(function(err){
				Logger.error("[SYNCHRO] Error calling PersistenceManager.getStageTransactionRecords", null, clazzmethod);
				Logger.errorJSON("[SYNCHRO] ERROR: ", err, clazzmethod);
				deferred.reject(error);
			});

			return deferred.promise;
		},
		// Flush Transactions logic would now ensure that after one set of flush happens 
		// for transactions in the queue, if there are any more transactions added
		// to the transaction queue (for any other records) then those will also
		// get flushed, until the transaction queue is empty. This will ensure that
		// multiple transactions related to different records are all processed right away
		// instead of waiting for the next flush. Example use case: Creating a follow-up
		// work order that updates the original work order with a follow-up flag 
		// (one txn for existing work order) and then a new work order that represents 
		// the follow-up (second txn for follow-up work). In this case, the first one gets
		// flushed, while the second one is stored in the Transaction Queue and the second
		// txn only gets processed on a next flush, which can happen if a user modifies some
		// other record or synchronizes the data explicitly or waits for heartbeat sync.
		_flushTransactions: function(_pushPromise) {
			var self = this;
			if(!_flushingActive && Object.keys(_promotingActive).length == 0){
				self._flushTransactionsInternal(_pushPromise, {});
				
			}else{
				Logger.trace("[SYNCHRO] FLUSHING active.", null, this.CLAZZ);
				_pushPromise.resolve();				
			}
			return _pushPromise.promise;
		},
		_flushTransactionsInternal : function(_pushPromise, processedTxnIds) {
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, '_flushTransactionsInternal');
			var self = this;
			_flushingActive = true;
			CommunicationManager.checkConnectivityAvailable().then(function(connected) {
				
				if(connected) {
					PersistenceManager.getTransactionOfAllRecords().then(function(transactions) {
						// If no transactions, then we are done.
						if (transactions.length == 0)
						{
							Logger.trace("[SYNCHRO] No transactions to send.", null, clazzmethod);;
							_pushPromise.resolve();
							_flushingActive = false;
							return;
						}
						
						var transactionsToProces = [];
						arrayUtil.forEach(transactions, function(transaction){
							if (processedTxnIds[transaction._id] == undefined)
							{
								transactionsToProces.push(transaction);
								processedTxnIds[transaction._id] = transaction._id;
							}
						});
						if (transactionsToProces.length == 0)
						{
							_pushPromise.resolve();
							_flushingActive = false;
							return;
						}
						
						var _pushPromise2 = new Deferred();
						self._pushTransactionsOfAllRecords(transactionsToProces, _pushPromise2);
						_pushPromise2.then(function() {
							// try and see if there are more transactions in the queue
							// since we last checked and process them also.
							self._flushTransactionsInternal(_pushPromise, processedTxnIds);
							
						}).otherwise(function(error) {
							_pushPromise.reject(error);
							_flushingActive = false;
						});
						
						
					}).otherwise(function(error){
						Logger.error("[SYNCHRO] Error calling PersistenceManager.getTransactionOfAllRecords", null, clazzmethod);
						Logger.errorJSON("[SYNCHRO] ERROR: ", error, clazzmethod);
						_pushPromise.reject(error);
						_flushingActive = false;
					});
				}else{
					// 101512
					_pushPromise.resolve();
					_flushingActive = false;
				}
			});

		},
		_pushTransactionsOfAllRecords: function(allTransactions, promise){
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, '_pushTransactionsOfAllRecords');
			var self = this;
			Logger.traceJSON("[SYNCHRO]  Transations set: ", allTransactions, self.CLAZZ);
			if(allTransactions){
				//Find all transactions with empty payloads and remove them from the transaction store
				var emptyTransactions = arrayUtil.filter(allTransactions, function(aTransaction){
					
					return aTransaction.json.payload.length == 0; 
				});
							
				for(var emptyTransaction in emptyTransactions){
					Logger.trace("[SYNCHRO] Found transactions with empty paylod, removing them...", null, clazzmethod);;
					PersistenceManager.removeTransactionRecordOf(emptyTransactions[emptyTransaction]);
				}
						
				allTransactions = arrayUtil.filter(allTransactions, function(aTransaction){
					var promoting = _promotingActive[aTransaction.json.resourceName + "-" + self._resourceIdToJSONStoreId(aTransaction.json.storeId)];
					if (promoting){
						Logger.trace("[SYNCHRO] Active promotion. Not pushing transaction for " + aTransaction.json.resourceName + ", store id: " + self._resourceIdToJSONStoreId(aTransaction.json.storeId));
					}
					return aTransaction.json.payload.length > 0 && !promoting; 
				});

				if(allTransactions.length > 0){
					Logger.trace("[SYNCHRO] Total transactions to be pushed: " + allTransactions.length, null, clazzmethod);
					//if (allTransactions.length > 1) {
						var notification_position = SystemProperties.getProperty('si.transaction.upload.notification');
						window.UI.showToastMessage("Total transactions to be sent: " + allTransactions.length, null, notification_position);
					//}
					var resend_interval = null;
					var firstRecord = allTransactions.shift();
					if(firstRecord.json[PlatformConstants.SYSTEM_ERROR_LAST_RECEIVED]){
				 		resend_interval = this._lastSystemErrorRecievedInterval(firstRecord.json[PlatformConstants.SYSTEM_ERROR_LAST_RECEIVED]);
				
					}
					var sys_interval = SystemProperties.getProperty('si.transaction_timedout.resend.interval');
					sys_interval = sys_interval?sys_interval: 20000;
					if(resend_interval && resend_interval< sys_interval){

						allTransactions.push(firstRecord);
						firstRecord = allTransactions.shift();
					}
					_promotingActive[firstRecord.json.resourceName + "-" + self._resourceIdToJSONStoreId(firstRecord.json.storeId)] = true;
					var self = this;
					this._pushTransactionsOfSingleRecord(firstRecord).then(function(obj){
						delete _promotingActive[firstRecord.json.resourceName + "-" + self._resourceIdToJSONStoreId(firstRecord.json.storeId)];
						self._pushTransactionsOfAllRecords(allTransactions, promise);
					}).otherwise(function(error){
						delete _promotingActive[firstRecord.json.resourceName + "-" + self._resourceIdToJSONStoreId(firstRecord.json.storeId)];
						if(error.type == "system"){
							Logger.error("[SYNCHRO] Returned system error. Stopping transaction processing", null, clazzmethod);
							Logger.errorJSON("[SYNCHRO] ERROR", error, clazzmethod);
							promise.reject(error);
							_flushingActive = false;
						}
						else if(error.type === 'callAbandoned'){
							Logger.error("[SYNCHRO] _pushTransactionsOfAllRecords returned callAbandoned error. Proceeding to other records." , null, this.CLAZZ);
							self._pushTransactionsOfAllRecords(allTransactions, promise);
						}
						else{
							Logger.logError("[SYNCHRO] Returned non system error. Proceeding to other records ", null, clazzmethod);
							Logger.errorJSON("[SYNCHRO] ERROR", error, clazzmethod);
							self._pushTransactionsOfAllRecords(allTransactions, promise);
						}
					});
				} 
				else{
					promise.resolve();
					_flushingActive = false;
				}
			}
			else{
				promise.resolve();
				_flushingActive = false;
			}	
		},
		_pushTransactionsOfSingleRecord: function(transaction){
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, '_pushTransactionsOfSingleRecord');
			var self = this;
			Logger.trace("[SYNCHRO] Pushing transactions of a single record", null, this.CLAZZ);
			Logger.traceJSON("[SYNCHRO] TRANSACTION: ", transaction, this.CLAZZ);
			var deferred = new Deferred();			
			var metadata = ResourceMetadataContext.getResourceMetadata(transaction.json.resourceName);
			if(this._isTransactionInErrorState(transaction)){
				Logger.warn("[SYNCHRO] transaction is in error state, trying to correct it", null, this.CLAZZ);;
				this._reorganizeSubTransactionsForErrorCorrections(metadata, transaction);
				this._clearTransactionFromErrorState(transaction);
			}

			Logger.trace("[SYNCHRO] Transaction is not yet locked for updates", null, this.CLAZZ);
			if (!transaction.json[PlatformConstants.TRANSACTION_LOCK_FORUPDATE])
			{
				Logger.trace("[SYNCHRO] Trying to shrink/merge transactions and lock transactions...", null, this.CLAZZ);
				var self = this;
				var promise = this._shrinkSubTransactions(metadata, transaction);
				
				promise.then(function() {
					Logger.trace("[SYNCHRO] Shrink/merge successfully completed!", null, clazzmethod);
					self._pushSubTransactions(transaction, deferred);

					//IJ29687
					if(transaction.json.resourceName == 'lbslocation'){
						PersistenceManager.removeLbslocationFromJStore(transaction.json.resourceName);
						PersistenceManager.removeTransactionRecordOf(transaction);
					}

				}).otherwise(function(error){
					Logger.error("[SYNCHRO] Shrink/merge failed!", null, clazzmethod);
					Logger.errorJSON("[SYNCHRO] ERROR: ", error, clazzmethod)
					deferred.reject(error);
					
				});
			}
			else ///This should never be called since flushing starts only when transaction lock is removed
			{
				Logger.trace("[SYNCHRO] Performing asynchronous operations", null, clazzmethod);
				this._pushSubTransactions(transaction, deferred, null);
				
			}
			
			return deferred.promise;
		},
		_attachIdentifierIfNeeded: function(firstTransactionInLocalFormat, lastResult){
			//Expecting lastResult to be translated to local attributes
			var self = this;
			//If lastResult doesn't have a LOCAL_UNIQUEID_ATTRIBUTE then assuming previous transaction was not properly handled by the server
			//so no need to update LOCAL_UNIQUEID_ATTRIBUTEs of the transaction
			if(lastResult && lastResult[PlatformConstants.LOCAL_UNIQUEID_ATTRIBUTE]){
				//Always set because child records have the anywhererefid as the remoteid and need to be updated with the one from the response.
				firstTransactionInLocalFormat[PlatformConstants.LOCAL_UNIQUEID_ATTRIBUTE] = lastResult[PlatformConstants.LOCAL_UNIQUEID_ATTRIBUTE];
				for(var attribute in lastResult){
					if(lastResult[attribute] && lang.isArray(lastResult[attribute])){
						arrayUtil.forEach(lastResult[attribute], function(relatedRecord){
							if(relatedRecord[PlatformConstants.REF_ID_ATTR]){
								if(firstTransactionInLocalFormat[attribute] && lang.isArray(firstTransactionInLocalFormat[attribute])){
									var found = arrayUtil.filter(firstTransactionInLocalFormat[attribute], function(transactionRecord){
										return transactionRecord[PlatformConstants.REF_ID_ATTR] === relatedRecord[PlatformConstants.REF_ID_ATTR];
									});
									if(found.length > 0){
										self._attachIdentifierIfNeeded(found[0], relatedRecord);
									}
								}
								// if it is not present in the current transaction, ignore it
								// as it is going to be added in the patch that is applied 
								// after the local update.
							}
						});

					}
				}
			}
		},
		_propagateIdentifiedIfNeededOnSubTransactions: function(subTransactions, lastResult){
			arrayUtil.forEach(subTransactions, function(aSubTransaction){
				this._attachIdentifierIfNeeded(aSubTransaction, lastResult);
			}, this);
		},
		_pushSubTransactions: function(transaction, promise, lastResult){
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, '_pushSubTransactions');
			var resend_interval = -1;
			
			var data = transaction.json;
			var subTransactions = data.payload;
			// Issue# 133396 
			// The lastResult has to be propagated to all sub transaction, as we cannot just rely on 
			// the lastResult from a previous sub-transaction.
			// for Ex: If there is a new record created, and change status is modified let's say two times
			// one for WPCOND and another for WAPPR, then the first create will go through and gives us
			// a remoteid (rdf:about) that we attach to the next sub transaction, which will let the
			// status change with WPCOND to go through and that will not return any result
			// and results the subsequent WAPPR status change to go without the remoteid
			// and fails (because if you send just a sub-transaction without any identifier, then the server
			// would not know what to do about it).
			this._propagateIdentifiedIfNeededOnSubTransactions(subTransactions, lastResult);
			if(transaction.json[PlatformConstants.SYSTEM_ERROR_LAST_RECEIVED]){
				 resend_interval = this._lastSystemErrorRecievedInterval(transaction.json[PlatformConstants.SYSTEM_ERROR_LAST_RECEIVED]);
				
			}
			
			var sys_interval = SystemProperties.getProperty('si.transaction_timedout.resend.interval');
			sys_interval = sys_interval?sys_interval: 20000;
			
			if(subTransactions && subTransactions.length > 0 && (resend_interval === -1 || resend_interval > sys_interval)){
				
				Logger.timerStart("[SYNCHRO] _pushSubTransaction");
				var firstTransaction = subTransactions.shift();
				this._attachIdentifierIfNeeded(firstTransaction, lastResult);
				var self = this;
				Logger.traceJSON("[SYNCHRO] Pushing following transaction to server: " , firstTransaction, this.CLAZZ);
				
				if(processing_transactions[firstTransaction['transactionid']]){
					promise.reject({'type': 'callAbandoned'});
				}else{
					processing_transactions[firstTransaction['transactionid']] = true;
				
				this._doPushTransaction(
						data.resourceName, 
						self._resourceIdToJSONStoreId(data.storeId), 
						firstTransaction)
				.then(function(response){
					Logger.timerEnd("[SYNCHRO] _pushSubTransaction");
					delete processing_transactions[firstTransaction['transactionid']];
					var clearOriginalState = (subTransactions.length === 0);
					self._updateRecordWithServerResponse(transaction, (response["rdf:about"]?response:{}), clearOriginalState).always(function(){
					// If we know we don't have any more sub-transactions left, then
					// we can remove the transaction from the queue and allow for any
					// staged records to get pushed to the transaction queue.
					
					if (subTransactions.length == 0)
					{
						// Remove the transaction that is now empty.
						PersistenceManager.removeTransactionRecordOf(transaction).then(function() {
							promise.resolve(response || {});
							}).otherwise(function(error){
								Logger.logError("[DOPUSH] removeTransactionRecordOf errored. Error: ", error, clazzmethod);
								promise.reject(error);
						});
					}
					else
					{
						// Save the current transaction with the one sub-transaction removed 
						// earlier that was successful. After this, try to push for any remaining
						// sub-transactions to the server.
							PersistenceManager.saveTransactionRecord(transaction).otherwise(function(error){
								Logger.logError("[DOPUSH] saveTransactionRecord errored. Error: ", error, clazzmethod);
							}).always(function(){
							if (response["rdf:about"]){
								//Need to translate to local attributes to be able to copy over unique ids (remoteid)
								var metadata = ResourceMetadataContext.getResourceMetadata(data.resourceName);
								OslcJsonTranslator.translateOSLCDataToStore([response], metadata);
							}
							
							self._pushSubTransactions(transaction, promise, response);
							
							
							
						});	
					}
						
					});
				}).otherwise(function(error){
					delete processing_transactions[firstTransaction['transactionid']];
					if(error.type == "business"){
						Logger.logError("[DOPUSH] Business Error returned from the server. Error: ", error, clazzmethod);
						/* if there was a business error, the record transaction will be put in
						 * an error state, so the queue can be reorganized for a new flush
						 * with the corrections - we need also to put the subtransaction back
						 **/
						// Only when we get a confirmation from server, we need to delete the
						// lock for further staged transaction updates to be 
						// pushed to the transaction queue.
						delete transaction.json[PlatformConstants.TRANSACTION_LOCK_FORUPDATE];
						delete transaction.json[PlatformConstants.SYSTEM_ERROR_LAST_RECEIVED];

						var metadata = error.additionalInfo.metadata;
						var storeId = error.additionalInfo.storeId;
						var errorMessage = Html.encode(error.additionalInfo.errorMessage);
						self._putTransactionInErrorState(transaction);
						subTransactions.unshift(firstTransaction);
						self._propagateIdentifiedIfNeededOnSubTransactions(subTransactions, lastResult);
						var baseDataForUndo = self._generateBaseDataForUndo(lastResult);
						self._mergePendingTransactionHeaderAttributesWithLastResult(metadata, subTransactions, lastResult);						
						self._updateRecordWithErrorFromServer(metadata, storeId, errorMessage, lastResult, error, baseDataForUndo)
							.otherwise(function(errorResult){
								PersistenceManager.saveTransactionRecord(transaction).always(function(){
									promise.reject(errorResult);		
								});	
							});									
					}else{
						Logger.logError("[DOPUSH] Error sending transaction to server. Error: ", error, clazzmethod);
						delete transaction.json[PlatformConstants.TRANSACTION_LOCK_FORUPDATE];
						transaction.json[PlatformConstants.SYSTEM_ERROR_LAST_RECEIVED] = new Date();
						
						subTransactions.unshift(firstTransaction);
						
						self._propagateIdentifiedIfNeededOnSubTransactions(subTransactions, lastResult);
						//Make this a priority transaction so it will be sent separately and before any additional transactions and also so it will use same transaction id.
						subTransactions[0][PlatformConstants.TRANSACTION_TYPE_ATTR]= PlatformConstants.TRANSACTION_TYPE_PRIORITY;
						self._mergePendingTransactionHeaderAttributesWithLastResult(error.metadata, subTransactions, lastResult);						
						
						PersistenceManager.saveTransactionRecord(transaction).always(function(){
							
							promise.resolve({});		
						});	
					}							
				});
			}
			}
			else{
				promise.resolve(lastResult || {});
			}
		},
		_generateBaseDataForUndo: function(lastResult){			
			return lastResult ? lang.clone(lastResult) : null;				
		},		
		_mergePendingTransactionHeaderAttributesWithLastResult: function(metadata, subTransactions, lastResult){
			if(lastResult){
				OslcJsonTranslator.translateOSLCDataToStore([lastResult], metadata);
				arrayUtil.forEach(subTransactions, function(aSubTransaction){
					for(var attr in aSubTransaction){
						var fieldInfo = metadata.getField(attr);
						if(fieldInfo && fieldInfo.multiplicity && fieldInfo.multiplicity.match(/-or-one$/)){
							lastResult[attr] = aSubTransaction[attr];
							if(fieldInfo.dataType == "inline"){
								lastResult[attr + "_ref"] = aSubTransaction[attr + "_ref"];
							}
						}						
					}
				});
			}
		},		
		_shrinkSubTransactions: function(metadata, transaction){
			// TODO implement in the future when we some response with rdf abouts of oslc
			// for new records that are created under the main record
			return this._reorganizeSubTransactions(metadata, transaction);
		},
		_mergeArrays: function(currentData, incomingData){
			var result = [];
			var map = {};
			var self = this;						
			Logger.trace("[SYNCHRO] Merging sub-transactions", null, this.CLAZZ);
			Logger.traceJSON("[SYNCHRO] CURRENT  SUB-TRANSACTION: ", currentData, this.CLAZZ);
			Logger.traceJSON("[SYNCHRO] INCOMING SUB-TRANSACTION: ", incomingData, this.CLAZZ);
			// merge is based on remoteid (if it exists) or refId otherwise
			arrayUtil.forEach(currentData, function(aValue, index){
				result.push(aValue);
				var data = aValue.json || aValue;
				if((data[PlatformConstants.LOCAL_UNIQUEID_ATTRIBUTE] || "").indexOf("http") == 0){
				//if((data[PlatformConstants.LOCAL_UNIQUEID_ATTRIBUTE] || "").indexOf("http:") == 0){
					map[data[PlatformConstants.LOCAL_UNIQUEID_ATTRIBUTE]] = index;
				}
				else if(data[PlatformConstants.REF_ID_ATTR]){
					map[data[PlatformConstants.REF_ID_ATTR]] = index;
				}
				else if(data[PlatformConstants.TEMPID_ATTR_NAME]){
				//else {
					map[data[PlatformConstants.TEMPID_ATTR_NAME]] = index;	
				}
			});
			arrayUtil.forEach(incomingData, function(aValue){
				var index = -1;
				var data = aValue.json || aValue;
				if(map[data[PlatformConstants.LOCAL_UNIQUEID_ATTRIBUTE]] >= 0){
					index = map[data[PlatformConstants.LOCAL_UNIQUEID_ATTRIBUTE]];
				}
				else if(map[data[PlatformConstants.REF_ID_ATTR]] >= 0){
					index = map[data[PlatformConstants.REF_ID_ATTR]];
				}
				else{
					index = map[data[PlatformConstants.TEMPID_ATTR_NAME]];	
				}
				if(index >= 0){
					if (result[index].json){
						self._mergeWithExistingRecord(result[index].json, aValue);
					} else {
						self._mergeWithExistingRecord(result[index], aValue);	
					}
				}else{
					result.push(aValue);
				}
			});
			Logger.traceJSON("[SYNCHRO] MERGED SUB-TRANSACTION: ", result, this.CLAZZ);
			return result;
		},

		_reorganizeSubTransactionsForErrorCorrections: function(metadata, transaction){
			Logger.traceJSON("[SYNCHRO] BEFORE: ", transaction, this.CLAZZ);
			var subTransactions = transaction.json.payload;
			if(subTransactions.length > 1 && transaction.json.isInError){
				var erroredSubTransaction = subTransactions[0];
				if (erroredSubTransaction[PlatformConstants.TRANSACTION_TYPE_ATTR] == PlatformConstants.TRANSACTION_TYPE_PRIORITY){
					var fields = [];
					//Only going to merge in complex fields so search for any in this transaction
					for(var attr in erroredSubTransaction){
						var fieldInfo = metadata.getField(attr);
						if(fieldInfo && !fieldInfo.local && fieldInfo.multiplicity && fieldInfo.multiplicity.match(/-many$/)){
							fields.push(attr);
						}
					}
					//Now look for other transactions that have the same fields to see if the user corrected the error
					for(var x= 1; x < subTransactions.length; x++){
						var subTransaction = subTransactions[x];
						if(subTransaction[PlatformConstants.TRANSACTION_TYPE_ATTR] != PlatformConstants.TRANSACTION_TYPE_PRIORITY){
							var self = this;
							arrayUtil.forEach(fields,function(field){
								var childArray = subTransaction[field];
								if (lang.isArray(childArray)){
									var originalChildArray = erroredSubTransaction[field];
									arrayUtil.forEach(originalChildArray,function(originalRec){
										var toRemove = -1;
										//Try to find matching child record
										if(arrayUtil.some(childArray,function(childRec, i){
											if(originalRec[PlatformConstants.REF_ID_ATTR] == childRec[PlatformConstants.REF_ID_ATTR] || 
													originalRec[PlatformConstants.LOCAL_UNIQUEID_ATTRIBUTE] == childRec[PlatformConstants.LOCAL_UNIQUEID_ATTRIBUTE] ||
													originalRec[PlatformConstants.TEMPID_ATTR_NAME] == childRec[PlatformConstants.TEMPID_ATTR_NAME]){
												self._mergeWithExistingRecord(originalRec, childRec);
												toRemove = i;
												return true;
											}
											return false;
										})){
											//Remove merged record from subtransaction so change isn't sent twice
											if (childArray.length == 1){
												delete subTransaction[field];
											}
											else{
												childArray.splice(toRemove, 1);
											}
										}
									});
								}
							});
						}
					};
				}
			}
			Logger.traceJSON("[SYNCHRO] AFTER: ", transaction, this.CLAZZ);
		},

		_reorganizeSubTransactions: function(metadata, transaction){
			Logger.traceJSON("[PUSHING] reorganizeSubTransactions - Transaction before: ", transaction, null, this.CLAZZ);;
			subTransactions = transaction.json.payload;

			// we need to group all modifications made to simple attributes of the main
			// object in a single subtransaction to be placed in the head of the subtransaction queue.
			// all priority operations should be kept in the order they are and all modifications
			// on related records (that are not priority) should be placed in the tail of the subtransaction
			// queue.
			var head = {};
			var tail = {};
			var attachments = {};
			var self = this;

			arrayUtil.forEach(subTransactions, function(aSubTransaction){
				if(aSubTransaction[PlatformConstants.TRANSACTION_TYPE_ATTR] != PlatformConstants.TRANSACTION_TYPE_PRIORITY){
					var hasDeletion = !!aSubTransaction.hasDeletion;
					var previousTransactionid = aSubTransaction.transactionid || "";
					for(var attr in aSubTransaction){
						var fieldInfo = metadata.getField(attr);
						if(fieldInfo){
							if(fieldInfo.multiplicity){
								if(fieldInfo.multiplicity.match(/-one$/)){
									head[attr] = aSubTransaction[attr];
									if(fieldInfo.dataType == "inline"){								 										
										head[attr + "_ref"] = aSubTransaction[attr + "_ref"];
									}
								}
								else{
									//we need to check if the resource is a attachment and put it in a separetade transaction,
									//since the attachments is sent to the server using the servlet not the OSLC interface
									if(metadata.isComplexFieldAnAttachment(attr)){
										attachments[attr] = self._mergeArrays(attachments[attr] || [], aSubTransaction[attr]);
										attachments['hasDeletion'] = hasDeletion;
										// if there was a previous attachment transaction in error
										if (transaction.json[PlatformConstants.SYSTEM_ERROR_LAST_RECEIVED]) {
											// ensure the transactionid is not lost
											attachments["transactionid"] = previousTransactionid;
										}else{
											arrayUtil.forEach(attachments[attr], function(attachment){
												if(!attachment['attachmentTransId']){
													attachment['attachmentTransId'] = TransactionIdGenerator.newTransactionId();
												}
											});
										}
										
									} else {
										tail[attr] = self._mergeArrays(tail[attr] || [], aSubTransaction[attr]);
										tail['hasDeletion'] = hasDeletion;
									}
								}
							}
							else if(fieldInfo.name == PlatformConstants.LOCAL_UNIQUEID_ATTRIBUTE){
								head[attr] = tail[attr] = attachments[attr] = aSubTransaction[attr];								
							}
						}

						delete aSubTransaction[attr];
					}										
				}
			});
			if(Object.keys(head).length > 1 || 
			   (Object.keys(head).length === 1 && Object.keys(head)[0] != PlatformConstants.LOCAL_UNIQUEID_ATTRIBUTE)){
				
				head["transactionid"] = TransactionIdGenerator.newTransactionId();
				head[PlatformConstants.TRANSACTION_TYPE_ATTR] = PlatformConstants.TRANSACTION_TYPE_NORMAL;
				subTransactions.unshift(head);
			}			
			if(Object.keys(tail).length > 1 || 
			   (Object.keys(tail).length === 1 && Object.keys(tail)[0] != PlatformConstants.LOCAL_UNIQUEID_ATTRIBUTE)){
				tail["transactionid"] = TransactionIdGenerator.newTransactionId();
				tail[PlatformConstants.TRANSACTION_TYPE_ATTR] = PlatformConstants.TRANSACTION_TYPE_NORMAL;
				subTransactions.push(tail);
			}
			if(Object.keys(attachments).length > 1 || 
				(Object.keys(attachments).length === 1 && Object.keys(attachments)[0] != PlatformConstants.LOCAL_UNIQUEID_ATTRIBUTE)){
				// attachments["transactionid"] is only set if a previous attachment transaction had an error
				if (!attachments["transactionid"]) {
					attachments["transactionid"] = TransactionIdGenerator.newTransactionId();
				}
				attachments[PlatformConstants.TRANSACTION_TYPE_ATTR] = PlatformConstants.TRANSACTION_TYPE_NORMAL;
				subTransactions.push(attachments);
			}
			var pos = 0;
			while(pos < subTransactions.length){
				if(Object.keys(subTransactions[pos]).length == 0){
					subTransactions.splice(pos, 1);
				}else{
					pos++;
				}
			}			

			// Lock the transaction queue from any further updates until these sub-transactions
			// are gauranteed to be sent to the server for execution. The lock only gets released
			// if the transaction is successfully processed, or if there is any error received from 
			// server. In case of time-outs, re-tries, the lock remains and the sub-transactions are
			// resent unaltered to the server.
			// 
			transaction.json[PlatformConstants.TRANSACTION_LOCK_FORUPDATE] = true;
			Logger.traceJSON("[PUSHING] reorganizeSubTransactions - Transaction after reorg: ", transaction, null, this.CLAZZ);;
			return PersistenceManager.saveTransactionRecord(transaction);
		},

		_whichComplexFieldsToAsk: function(aSinglePayloadEntry){
			var result = [];
			for(var attribute in aSinglePayloadEntry){
				if(aSinglePayloadEntry[attribute] && lang.isArray(aSinglePayloadEntry[attribute])){
					result.push(attribute);
				}
			}
			return result;
		},
		_doPushTransaction: function(resourceName, storeId, aSinglePayloadEntry){
			var deferred = new Deferred();
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, '_doPushTransaction');
			var self = this;
			var hasDeletion = !!aSinglePayloadEntry.hasDeletion;
			var complexFieldsToAsk = this._whichComplexFieldsToAsk(aSinglePayloadEntry);
			var translatedPayload = OslcJsonTranslator.translateTransactionPayloadToOslc(resourceName, aSinglePayloadEntry);
			var identifier = translatedPayload["rdf:about"] || null;
			delete translatedPayload["rdf:about"];

			var changeRecord = {
					'payload': translatedPayload,
					'identifier': identifier,
					'transactionid': aSinglePayloadEntry.transactionid,
					'hasDeletion': hasDeletion
			};
			
			if(aSinglePayloadEntry['attachmentTransId'] && aSinglePayloadEntry['attachmentTransId'].length > 0)
				changeRecord['attachmentTransId'] = aSinglePayloadEntry['attachmentTransId'];
			
			var metadata = ResourceMetadataContext.getResourceMetadata(resourceName);
			Logger.setLevel(2);
			Logger.traceJSON("[SYNCHRO] METADATA: ", metadata, this.CLAZZ);
			Logger.traceJSON("[SYNCHRO] CHANGED RECORD: ", changeRecord, this.CLAZZ);
			Logger.traceJSON("[SYNCHRO] COMPLEX FIELDS TO ASK: ", complexFieldsToAsk, this.CLAZZ);
			CommunicationManager.pushResourceData(metadata,changeRecord,complexFieldsToAsk)
			.then(function(response){
				Logger.traceJSON("[SYNCHRO] SERVER RESPONSE SUCCESS: ", response, clazzmethod);
				deferred.resolve(response["invocationResult"] || {});
			}).otherwise(function(error){
				Logger.errorJSON("[SYNCHRO] SERVER RESPONSE FAIL: ", error, clazzmethod);
				var errorInfo = HTTPHelper.getResponseInfoUponError(error.invocationResult);
				var responseReceived = HTTPHelper.isResponseReceived(errorInfo.statusCode); 
				if(responseReceived){
					// transaction has already been processed in a previous request
					if(HTTPHelper.isConflictingTransaction(errorInfo.statusCode)){ 
						if(errorInfo.headers == null && changeRecord && changeRecord['payload'] && changeRecord['payload']['spi:attachments']){
							Logger.trace("Conflicting Attachment transaction was resent. ");
							errorInfo.headers = {'Location': changeRecord.identifier};
						}else if(errorInfo.headers == null || errorInfo.headers['Location'] == null){
							Logger.trace("A conflicting transaction was resent. Will not refresh.");
							deferred.resolve({});
						}
						// on a conflicting transaction 'complexFieldsToAsk' might be necessary to update child records
						CommunicationManager.pullSingleResourceData(metadata, errorInfo.headers["Location"], complexFieldsToAsk)
						.then(function(conflictingResource){
							Logger.error("[SYNCHRO] Transaction has already been processed in a previous request for resource: " + conflictingResource, null, clazzmethod);
							deferred.resolve(conflictingResource);
						}).otherwise(function(error){
							Logger.error("[SYNCHRO] Transaction has already been processed in a previous request, but we couldn't get conflicting resource from server", null, clazzmethod);
							Logger.errorJSON("[SYNCHRO] ERROR: ", error, clazzmethod);
							deferred.reject({"type": "system", "error": error, "metadata": metadata});													
						});						
					}
					else if(errorInfo.statusCode == 1) {
						//IJ25457
						if(changeRecord['payload']['spi:attachments']){
							PersistenceManager.removeFailedAttachments(changeRecord.payload["spi:attachments"][0]["wdrs:describedBy"]["spi:anywhererefid"], storeId);
						}
						
						deferred.reject({
							 "type": "", 
							 "error": error,								
							 "metadata": metadata
						});
					}
					else{
						Logger.error("[SYNCHRO] Transaction failed to processed by server", null, clazzmethod);
						deferred.reject({
							 "type": "business", 
							 "error": error,								
							 "additionalInfo": {
								 "metadata": metadata,
								 "storeId": storeId,
								 "errorMessage": errorInfo.message,
							 }
						});
					}
				}
				else {
					Logger.error("[SYNCHRO] Transaction failed to processed by server, no respons received", null, clazzmethod);
					deferred.reject({"type": "system", "error": error, "metadata" : metadata});	
				}				
			});			
			return deferred.promise;
		},
		
		_resourceIdToJSONStoreId: function(value){
			return parseInt((value || "<-1>").replace(/<|>/g, ""),10);
		},		
		_updateRecordWithServerResponse: function(transaction, lastResult, clearOriginalState){
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, '_updateRecordWithServerResponse');
			var self = this;
			var data = transaction.json;
			var metadata = ResourceMetadataContext.getResourceMetadata(data.resourceName);
			return StoreLock.lock(data.resourceName, function(){
				
				var lockDeferred = new Deferred();
				
				var id = self._resourceIdToJSONStoreId(data.storeId);
				PersistenceManager.findById(metadata, id).then(function(localRecordList){
					if(localRecordList && localRecordList.length > 0){
						var localRecordData = localRecordList[0].json;
						OslcJsonTranslator.translateOSLCDataToStore([lastResult], metadata);
						self._mergeWithExistingRecord(localRecordData, lastResult);
						localRecordData[PlatformConstants.LOCAL_VERSION_WINS] = true;
						Logger.trace("[SYNCHRO] Clearing original state for ModelData record.", null, clazzmethod);;
						localRecordData[PlatformConstants.ERRORED_ATTRIBUTE] = 0;
						localRecordData[PlatformConstants.ERRORED_ATTRIBUTE_MSG] = null;
						if(clearOriginalState)
							localRecordData[PlatformConstants.ORIGINAL_STATE_ATTRIBUTE] = 'null';
						
						
						PersistenceManager.replace(metadata, localRecordList).then(function(){
							Logger.trace("[SYNCHRO] Successfully replaced record.  ID: " + id, null, clazzmethod);;
							lockDeferred.resolve();
						}).otherwise(function(error){
							Logger.logError("[SYNCHRO] Could not update the record on the local device with the latest version from server.", error, clazzmethod);
							lockDeferred.resolve();
						});
					}
					else
					{
						Logger.trace("[SYNCHRO] RECORD NOT UPDATED.  Record not found. ID: " + id, null, clazzmethod);;
						lockDeferred.resolve();
					}
					
				}).otherwise(function(error){
					Logger.logError("[_updateRecordWithServerResponse] error calling findById.  Error:", error, clazzmethod);
					lockDeferred.resolve();
				});
				
				return lockDeferred.promise;
			});
		},
		_mergeWithExistingRecord: function(localRecordData, lastResult){
			if(lastResult){
				for(var attr in lastResult){
					var toMerge = lastResult[attr];
					if(toMerge){
						if(lang.isArray(toMerge)){
							localRecordData[attr] = this._mergeArrays(localRecordData[attr] || [], toMerge);	
						}						
						else{
							localRecordData[attr] = lastResult[attr];
						}
					}
					else{
						localRecordData[attr] = lastResult[attr];  
					}
				}
			}
		},		
		_updateRecordWithErrorFromServer: function(metadata, id, errorMsg, mergedLastResult, originalError, baseDataForUndo){
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, '_updateRecordWithErrorFromServer');
			var resourceName = metadata.getResourceName();
			var self = this;
			return StoreLock.lock(resourceName, function(){
				var promise = new Deferred();
				PersistenceManager.findById(metadata, id).then(function(localRecordList) {
					if(localRecordList && localRecordList.length > 0){					
						var localRecordData = localRecordList[0].json;
						self._updateOriginalStateUponError(metadata, localRecordList[0], baseDataForUndo);
						self._mergeWithExistingRecord(localRecordData, mergedLastResult);					
						localRecordData[PlatformConstants.ERRORED_ATTRIBUTE] = 1;
						localRecordData[PlatformConstants.ERRORED_ATTRIBUTE_MSG] = errorMsg;
						PersistenceManager.replace(metadata, localRecordList).then(function(){
							promise.reject({"type": "business", "error": originalError});
						}).otherwise(function(error){
							// if we reach here is because we have serious issues on the storage and the system is likely unstable.
							// log a message and stop all the processing
							Logger.logError("[PushingCoordinatorService] Could not update the record on the local device with the latest version from server.", error, clazzmethod);
							promise.reject({"type": "system", "error": error});
						});												
					}else{
						// this is virtually impossible to happen because the record had to be removed from the device
						// if we reach here means we have some problem in the undo or deleteLocal that allowed the record to be removed
						// and did not clean up the transaction queue.
						var error = new Error("Record removed.");
						Logger.error("[SYNCHRO] Could not find record "+resourceName+" - id "+ id +" on device to update error.", null, clazzmethod);;
						promise.reject({"type": "business", "error": error});
					}
				}).otherwise(function(error){
					Logger.logError("[SYNCHRO] Could not query record "+resourceName+" - id "+ id +" on device to update error.", error, clazzmethod);
					promise.reject({"type": "business", "error": error});
				});
				return promise.promise;
			});
		},
		_updateOriginalStateUponError: function(metadata, localRecordInJsonStoreShape, baseDataForUndo){
			// 109464
			if(baseDataForUndo){
				var cloned = lang.clone(localRecordInJsonStoreShape);
				OslcJsonTranslator.translateOSLCDataToStore([baseDataForUndo], metadata);				
				var relatedData = localRecordInJsonStoreShape.json.__complexAttributesFetched;
				/* clean up related data 
				 * to force it be loaded from the server */
				for(var attr in relatedData){
					cloned.json[attr] = null;
				}
				cloned.json.__complexAttributesFetched = {};
				this._mergeWithExistingRecord(cloned.json, baseDataForUndo);
				localRecordInJsonStoreShape.json[PlatformConstants.ORIGINAL_STATE_ATTRIBUTE] = 'null';
				var modelData = new ModelData(cloned);			
				var modelDataAsString = JSON.stringify(modelData);
				//Free memory up as soon as we are finished
				modelData = null;
				cloned = null;
				baseDataForUndo = null;
				localRecordInJsonStoreShape.json[PlatformConstants.ORIGINAL_STATE_ATTRIBUTE] = CompressionHelper.compress(modelDataAsString);
			}
		},

		_lastSystemErrorRecievedInterval: function(timestamp){
			return new Date() - new Date(timestamp);
		}
	};
});
