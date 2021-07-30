//
//  ISIJsonUtils.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 17/4/2014.
//
//

#import <Foundation/Foundation.h>

@interface ISIJsonUtils : NSObject

+(NSDictionary*) convertToJsonObject:(id)object;
+(id) convertFromJsonObject:(NSDictionary*)jsonObject className:(NSString*)className;

@end
