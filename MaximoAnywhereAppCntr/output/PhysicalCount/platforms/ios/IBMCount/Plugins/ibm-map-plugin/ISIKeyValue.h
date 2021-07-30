//
//  ISIKeyValue.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 24/4/2014.
//
//

#import <Foundation/Foundation.h>

@interface ISIKeyValue : NSObject

@property NSInteger key;
@property NSInteger value;

-(id)initWithKey:(NSInteger)key value:(NSInteger)value;
+(NSArray*) keysFromKeyValueArray:(NSArray*)array;
+(NSArray*) valuesFromKeyValueArray:(NSArray*)array;

@end
