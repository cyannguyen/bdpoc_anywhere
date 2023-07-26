define("generated/application/pushNotification/PushNotificationSelfRegistrationGenerated",
["dojo/_base/declare",
"dojo/Deferred",
"dojo/_base/lang",
"dojo/_base/array",
"platform/pushNotification/PushNotificationService",
"platform/store/SystemProperties"
],
function(declare, Deferred, lang, arrayUtil,PushNotificationService, SystemProperties) {
   return declare(null, {
      register: function(){
         var eventsArray = new Array();
         var pushNotificationService  = new PushNotificationService();
         pushNotificationService.subscribeForEvents(eventsArray);
      },
      doUnsubscribe: function(){
         var pushNotificationService = new PushNotificationService();
         pushNotificationService.doUnsubscribe();
      }
   });
});
