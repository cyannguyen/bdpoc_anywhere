//
//  ISIWorkOfflinePlugin.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 6/6/2014.
//
//

#import <Cordova/CDV.h>
#import "ISIMapProperties.h"
#import "ISIPromise.h"

@interface ISIWorkOfflinePlugin : CDVPlugin <ISIPromiseDelegate>

-(void) fake:(CDVInvokedUrlCommand*) command;

@property SEL originalSelector;
@property ISIMapProperties *mapProperties;

@end
