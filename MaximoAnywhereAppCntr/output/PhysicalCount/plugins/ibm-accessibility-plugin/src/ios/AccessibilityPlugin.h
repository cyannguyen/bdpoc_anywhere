//
//  Acessibility.h
//  MaximoAnywhereWorkExecutionIphone
//
//  Created by local admin on 3/28/17.
//
//

#ifndef AccessibilityPlugin_h
#define AccessibilityPlugin_h


#endif /* AccessibilityPlugin_h */

#import <Cordova/CDVPlugin.h>


@interface AccessibilityPlugin : CDVPlugin {
    NSString* callbackId;
    NSString* commandCallback;
    BOOL voiceOverEnabled;
}

@property (strong) NSString* callbackId;
@property (strong) NSString* commandCallbackId;
@property BOOL voiceOverEnabled;




- (void) isVoiceOverEnabled:(CDVInvokedUrlCommand*)command;


@end
