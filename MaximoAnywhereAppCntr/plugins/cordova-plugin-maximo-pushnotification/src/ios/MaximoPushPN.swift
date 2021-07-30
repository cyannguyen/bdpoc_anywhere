
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

import Foundation
import UIKit
import BMSCore
import BMSPush
import UserNotifications

import PushKit

public class MaximoPushPN: NSObject, UNUserNotificationCenterDelegate {
    
    let userID: String
    let mPN:CDVPlugin
    let gcmMessageIDKey = "gcm.message_id"

    init(userID: String,mPN:CDVPlugin) {
        self.userID = userID
        self.mPN = mPN
        super.init()
    }

    public func onChangePermission(status: Bool) {
        print ("Push Notification is enabled: \(status)" as NSString)
    }
        
    public func registerForPushNotifications() {
        if #available(iOS 10.0, *) {
            NSLog("MaximoPushPN: registerForPushNotifications")
            // For iOS 10 display notification (sent via APNS)
            UNUserNotificationCenter.current().delegate = self
            let authOptions: UNAuthorizationOptions = [.alert, .badge, .sound]
            UNUserNotificationCenter.current().requestAuthorization(
                options: authOptions,
                completionHandler: {_, _ in })
            // For iOS 10 data message (sent via FCM)
            //Messaging.messaging().delegate = self
        } else {
            let settings: UIUserNotificationSettings =
                UIUserNotificationSettings(types: [.alert, .badge, .sound], categories: nil)
            UIApplication.shared.registerUserNotificationSettings(settings)
        }

        UIApplication.shared.registerForRemoteNotifications()
       // updateFirestorePushTokenIfNeeded()
    }

    func initApp(regionUrl: String, appGUID: String, clientSecret: String) {
        
        NSLog("MaximoPushPN: initApp")
        BMSClient.sharedInstance.initialize( bluemixRegion: regionUrl)
        BMSPushClient.sharedInstance.initializeWithAppGUID(appGUID: appGUID, clientSecret: clientSecret)
    }
    
    func unregister() {
        NSLog("MaximoPushPN: unregister")
        BMSPushClient.sharedInstance.unregisterDevice(completionHandler: { (response, statusCode, error) in
            
            NSLog("MaximoPushPN: unregister")
            if error.isEmpty {
                _ = response?.description
                UIApplication.shared.unregisterForRemoteNotifications()
            } else {
                let message = error.description
                print("error :", message)
            }
        })
    }
    
    public func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void)  {

        //let json = try? JSONSerialization.data(withJSONObject: notification.request.content.userInfo).base64EncodedData()
        //let jsonData = String(data: json, encoding: String.Encoding.utf8) ?? "{}"
        
        NSLog("MaximoPushPN: UNUserNotificationCenter")
        print("Received message with response ",notification.request.content.userInfo)
        let message = extractUserInfo(userInfo: notification.request.content.userInfo)
        var msgObject:[String: String] = ["title": message.title, "message":message.body]
        
        if ( message.title.isEmpty) {
           msgObject = ["message":message.body]
        }
        let pluginResult = CDVPluginResult(
                         status: CDVCommandStatus_OK,
                         messageAs: msgObject
        )
        
        pluginResult?.setKeepCallbackAs(true)
        print ("callbackid in messagereceived : " + (PushNotification.notificationCallback?.callbackId)!)
        mPN.commandDelegate!.send(
                pluginResult,
                callbackId: PushNotification.notificationCallback?.callbackId
        )
        completionHandler([.alert, .badge, .sound])
    }

    func extractUserInfo(userInfo: [AnyHashable : Any]) -> (title: String, body: String) {
        var info = (title: "", body: "")
        guard let aps = userInfo["aps"] as? [String: Any] else { return info }
        guard let alert = aps["alert"] as? [String: Any] else { return info }
        let title = alert["title"] as? String ?? ""
        let body = alert["body"] as? String ?? ""
        info = (title: title, body: body)
        return info
    }
    
    
    public func userNotificationCenter(_ center: UNUserNotificationCenter,
                                     didReceive response: UNNotificationResponse,
                                    withCompletionHandler completionHandler: @escaping () -> Void)
    {
          
        NSLog("MaximoPushPN: didReceive")
        
        //let name = "John Doe123"
        //UserDefaults.standard.set(name, forKey: "name")
    
        let userInfo = response.notification.request.content.userInfo
        // Print message ID.
        if let messageID = userInfo[gcmMessageIDKey] {
            print("Message ID: \(messageID)")
        }

        // Print full message.
        print(userInfo)
       
        let message = extractUserInfo(userInfo: userInfo)
        var msgObject:[String: String] = ["title": message.title, "message":message.body]
           
        
        if ( message.title.isEmpty) {
            msgObject = ["message":message.body]
        }
        let pluginResult = CDVPluginResult(
                         status: CDVCommandStatus_OK,
                         messageAs: msgObject
        )
                
        pluginResult?.setKeepCallbackAs(true)
                
        print ("callbackid in messagereceived : " + (PushNotification.notificationCallback?.callbackId)!)
            mPN.commandDelegate!.send(
                        pluginResult,
                        callbackId: PushNotification.notificationCallback?.callbackId)
        
        completionHandler()
    }
      
    func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable: Any],fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
        
          NSLog("MaximoPushPN: didReceiveRemoteNotification")
          // If you are receiving a notification message while your app is in the background,
          // this callback will not be fired till the user taps on the notification launching the application.
          // TODO: Handle data of notification

          // With swizzling disabled you must let Messaging know about the message, for Analytics
          // Messaging.messaging().appDidReceiveMessage(userInfo)

          // Print message ID.
          if let messageID = userInfo[gcmMessageIDKey] {
            print("Message ID: \(messageID)")
          }

          // Print full message.
          print(userInfo)
        
          let message = extractUserInfo(userInfo: userInfo)
          var msgObject:[String: String] = ["title": message.title, "message":message.body]
          
          if ( message.title.isEmpty) {
            msgObject = ["message":message.body]
          }
           
          let pluginResult = CDVPluginResult(
                         status: CDVCommandStatus_OK,
                         messageAs: msgObject
          )
          
          pluginResult?.setKeepCallbackAs(true)
          print ("callbackid in messagereceived : " + (PushNotification.notificationCallback?.callbackId)!)
        
          mPN.commandDelegate!.send(pluginResult,
                                    callbackId: PushNotification.notificationCallback?.callbackId)
        
          completionHandler(UIBackgroundFetchResult.newData)
        }
      
}


