//
//  ISIPromise.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 17/4/2014.
//
//

#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>

@class ISIPromise;

@protocol ISIPromiseDelegate <NSObject>
-(void) promiseResolved:(ISIPromise *)promise;
@end

@interface ISIPromise : NSObject

@property BOOL resolved;
@property id result;
// holds any extra data related to the promise
@property NSMutableDictionary *extra;
@property id <ISIPromiseDelegate> delegate;

-(id) init;
-(void) resolve:(id)result;
-(id) get;
-(BOOL) isDone;


@end
