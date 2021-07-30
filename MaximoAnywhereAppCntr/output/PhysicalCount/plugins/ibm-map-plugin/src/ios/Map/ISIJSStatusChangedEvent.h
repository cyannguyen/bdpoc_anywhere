//
//  ISIJSStatusChangedEvent.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 3/27/14.
//
//

#import <Foundation/Foundation.h>
#import "ISIJSEvent.h"
#import "ISIMessage.h"

@interface ISIJSStatusChangedEvent : ISIJSEvent

typedef enum {
    INITIALIZED, INITIALIZATION_FAILED, LAYER_LOADED, LAYER_LOADING_FAILED
}STATUS;
#define STATUS_STRINGVALUES [NSMutableArray arrayWithObjects:@"INITIALIZED", @"INITIALIZATION_FAILED", @"LAYER_LOADED", @"LAYER_LOADING_FAILED", nil]
#define TYPE @"onStatusChanged"


-(STATUS) stringToStatusEnum:(NSString*)aString;

-(id) initWithJsonObject:(NSDictionary*)aData;
-(id) initWithStatus:(STATUS)status;

+(id) jsStatusChangeEventWithJsonObject:(NSDictionary*)aData;
+(id) jsStatusChangeEventWithStatus:(STATUS)status;
+(id) jsStatusChangeEventWithStatus:(STATUS)status message:(ISIMessage*)message;

@end
