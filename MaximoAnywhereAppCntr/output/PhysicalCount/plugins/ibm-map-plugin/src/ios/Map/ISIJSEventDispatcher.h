//
//  ISIJSEventDispatcher.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 3/27/14.
//
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "ISIJSEvent.h"

@interface ISIJSEventDispatcher : NSObject

@property UIWebView *webView;
@property NSString *javascriptPrefix;
@property NSString *application;

-(id) initWithWebView:(UIWebView*) webView;
-(void) sendEvent:(ISIJSEvent*)event handler:(NSString*)handler listener:(NSString*)listener;
+(id) jsEventDispatcherWithWebView:(UIWebView*) webView;

@end
