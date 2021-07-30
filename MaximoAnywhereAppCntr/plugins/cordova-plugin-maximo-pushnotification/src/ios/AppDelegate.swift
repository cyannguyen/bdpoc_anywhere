/*
*
* IBM Confidential
*
* OCO Source Materials
*
* 5724-U18
*
* (C) COPYRIGHT IBM CORP. 2019
*
* The source code for this program is not published or otherwise
* divested of its trade secrets, irrespective of what has been
* deposited with the U.S. Copyright Office.
*
*/

import UIKit
import BMSCore
import BMSPush
import UserNotifications
import UserNotificationsUI
import SwiftyJSON

public class AppDelegate: NSObject, BMSPushObserver {
    
    let gcmMessageIDKey = "gcm.message_id"
    
    public func onChangePermission(status: Bool) {
        print ("Push Notification is enabled: \(status)" as NSString)
    }
    
    static var shared: AppDelegate?
    private var appDelegate: UIApplicationDelegate
    private var application: UIApplication
    
    public init(_ application: UIApplication) {
        NSLog("AppDelegate: init")
        self.application = application
        self.appDelegate = application.delegate!
        super.init()
        if AppDelegate.shared == nil {
            AppDelegate.shared = self
        }
        register()
    
    }
    
    func register() {
        NSLog("AppDelegate: register")
        Swizzler.swizzleMethodImplementations(self.appDelegate.superclass!, "application:didRegisterForRemoteNotificationsWithDeviceToken:")
        Swizzler.swizzleMethodImplementations(self.appDelegate.superclass!, "application:didFailToRegisterForRemoteNotificationsWithError:")
     /*  Swizzler.swizzleMethodImplementations(self.appDelegate.superclass!,
            "application:didReceiveRemoteNotification:")*/
        Swizzler.swizzleMethodImplementations(self.appDelegate.superclass!,
            "application:didReceiveRemoteNotification:fetchCompletionHandler:")
    }
    
    
    func application(_ application: UIApplication,
               didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    
        NSLog(" AppDelegate: didFinishLaunchingWithOptions \(application.applicationState)")
        // Override point for customization after application launch.
        
        //Enable all notification type. VoIP Notifications don't present a UI but we will use this to show local nofications later
        // For iOS 10 display notification (sent via APNS)
        //UNUserNotificationCenter.current().delegate = self
        UNUserNotificationCenter.current().delegate = self as? UNUserNotificationCenterDelegate
                   
        let authOptions: UNAuthorizationOptions = [.alert, .badge, .sound]
            UNUserNotificationCenter.current().requestAuthorization(
                       options: authOptions,
                       completionHandler: {_, _ in })
    
        //register the notification settings
        UIApplication.shared.registerForRemoteNotifications()
    
        //output what state the app is in. This will be used to see when the app is started in the background
        NSLog("app launched with state \(application.applicationState)")
        
        return true
    }
    
    // APNS Token
    @objc public func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {

        NSLog("AppDelegate: didRegisterForRemoteNotificationsWithDeviceToken")
        let providerName =   PushNotification.getProviderName()
        if ( providerName == "APN")
        {
            let tokenParts = deviceToken.map { data in String(format: "%02.2hhx", data) }
            let token = tokenParts.joined()
            print("Device Token: \(token)")
            PushNotification.setPNDeviceId(deviceId: token as String)
        }
        else {
            let push =  BMSPushClient.sharedInstance
            let userId = PushNotification.userId
            push.registerWithDeviceToken(deviceToken: deviceToken, WithUserId: userId) { (response, statusCode, error) -> Void in
                if error.isEmpty {
                    print ("Response during device registration : \(String(describing: response))")
                    print( "status code during device registration : \(String(describing: statusCode))")
                
                    let tokenParts = deviceToken.map { data in String(format: "%02.2hhx", data) }
                    let token = tokenParts.joined()
                    print("Device Token: \(token)")
                
                    PushNotification.setPNDeviceId(deviceId: token as String)
                
                }
                else {
                    print( "Error during device registration \(error) ")
                    print( "Error during device registration \n - status code: \(String(describing: statusCode)) \n Error :\(error) \n")
                }
            }
        }
    }
    
    // APNS Error
    @objc public func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        // Call the registration handler, if defined (pass empty string as token)
        print(error)
    }
    
    // Device received notification (Legacy callback)
   /*@objc public func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any]){
        print("AppDelegate : didReceiveRemoteNotification")
        print(userInfo)
    }*/
    
    @objc func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
        print("AppDelegate : didReceiveRemoteNotification")
        
        let name = "testgggg"
        UserDefaults.standard.set(name, forKey: "name")
        UserDefaults.standard.synchronize()
              print(userInfo)
    }

    
 class Swizzler {
    class func swizzleMethodImplementations(_ className: AnyObject.Type, _ methodSelector: String) {
        let selector = Selector(methodSelector)
        let originalMethod = class_getInstanceMethod(className, selector)
        let swizzleMethod = class_getInstanceMethod(AppDelegate.self, selector)
        let didAddMethod = class_addMethod(className, selector, method_getImplementation(swizzleMethod!), method_getTypeEncoding(swizzleMethod!))
        if !didAddMethod {
            // Swizzle its implementation
            method_exchangeImplementations(originalMethod!, swizzleMethod!)
        }
     }
 }
    
}
