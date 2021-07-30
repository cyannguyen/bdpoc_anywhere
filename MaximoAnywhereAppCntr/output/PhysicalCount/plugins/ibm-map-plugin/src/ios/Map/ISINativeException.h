//
//  ISINativeException.h
//  AnywhereWorkManagerWorkExecutionIphone
//
//  Created by Fabio Franco on 9/10/14.
//
//

#import <Foundation/Foundation.h>

@interface ISINativeException : NSException

@property NSArray *parameters;
@property NSString *messageId;

-(id) initWithMessage:(NSString*) message andParameters: (NSArray*)parameters;

@end
