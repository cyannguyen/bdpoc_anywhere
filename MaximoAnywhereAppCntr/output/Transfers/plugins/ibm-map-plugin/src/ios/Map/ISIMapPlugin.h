//
//  ISIMapPlugin.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 3/20/14.
//
//

#import <Cordova/CDV.h>
#import "ISIPromise.h"
#import "ISINativeException.h"

@interface ISIMapPlugin : CDVPlugin <ISIPromiseDelegate>

@property SEL originalSelector;

-(void) fake:(CDVInvokedUrlCommand*) command;


@end
