//
//  ISIJSEvent.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 3/27/14.
//
//

#import <Foundation/Foundation.h>

@interface ISIJSEvent : NSObject

@property NSDictionary *data;
@property NSString *eventType;
@property NSString *JSListener;

-(id) initWithEventType:(NSString*)eventType jsonData:(NSDictionary*)aData;
-(id) initWithJsonData:(NSDictionary*)aData;

@end
