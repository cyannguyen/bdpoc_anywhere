//
//  ISIMapProperties.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 15/4/2014.
//
//

#import <Foundation/Foundation.h>
#import "ISILogger.h"
#import <UIKit/UIKit.h>

@interface ISIMapProperties : NSObject

@property (readonly) NSMutableArray *jsonArrayMapProp;
@property (readonly) NSDictionary *jsonObjectMapProp;

-(id) initWithJsonArray:(NSArray*)jsonArray;
-(id) initWithJsonObject:(NSDictionary*)json;

-(NSArray*) getJArray;
-(NSDictionary*) getJObject;
-(BOOL) needServiceAuthentication;
-(NSString*) getUserName;
-(NSString*) getUserPwd;
-(NSString*) getEsriRouteService;
-(NSInteger) getDirectionsPathWidth;
-(UIColor*) getDirectionsPathColor;
-(NSString*) getToken;
-(NSString*) getTokenService;
-(NSString*) getRefererService;
-(BOOL) isGetMethodEnabled;

@end
