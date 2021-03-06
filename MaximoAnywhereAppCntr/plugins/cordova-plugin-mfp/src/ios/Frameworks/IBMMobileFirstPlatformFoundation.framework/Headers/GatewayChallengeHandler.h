/**
	Licensed Materials - Property of IBM

	(C) Copyright 2015 IBM Corp.

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/

//
//  GatewayChallengeHandler.h
//  WorklightStaticLibProject
//
//  Created by Ishai Borovoy on 9/13/12.
//

#import "BaseChallengeHandler.h"
#import "WLDelegate.h"
#import "WLProcedureInvocationData.h"
#import "WLClient.h"

/**
 * You use this base class to create custom challenge handlers when using gateways. You must extend this class to implement your own challenge handler logic. You use this class to create custom user authentication with external gateways.
 */
@interface GatewayChallengeHandler : BaseChallengeHandler<WLDelegate> {
    @private
    id <WLDelegate> submitLoginFormDelegate;
}
    @property (atomic, strong) id <WLDelegate> submitLoginFormDelegate;

/**
 * Initialize a challenge handler for the specific gateway.
 *
 * @param gatewayName an arbitrary name for the challenge handler.
 */
-(id) initWithGatewayName: (NSString *)gatewayName;


/**
 * IBM MobileFirst Platform must call this method whenever isCustomResponse returns a YES value. You must implement this method. This method must handle the challenge, for example to show the login screen.
 *
 * @param response The WLResponse to be handled.
 **/
-(void) handleChallenge: (WLResponse *)response;

/**
 * You must call this method when the challenge is answered successfully, for example after the user successfully submits the login form. Then, this method sends the original request.
 * Calling this method informs IBM MobileFirst Platform that the challenge was successfully handled. This method can also be used to inform IBM MobileFirst Platform that the response that was received is not a custom response that your challenge handler can handle. In this case, control is returned to IBM MobileFirst Platform, to handle the response.
 *
 * @param response The received WLResponse.
 **/
-(void) submitSuccess:(WLResponse *) response;

/**
 * This method must be overridden by extending the GatewayChallengeHandler class. In most cases, you call this method to test whether there is a custom challenge to be handled in the response.
 * If this method returns YES, IBM MobileFirst Platform calls the handleChallenge method.
 *
 * @param response The WLResponse to be tested.
**/
-(BOOL)canHandleResponse:(WLResponse *) response  NS_SWIFT_NAME(canHandleResponse(_:));

/**
 * You use this method to send collected credentials to a specific URL. You can also specify request parameters, headers, and timeout.
 *
 * The success/failure delegate for this method is the instance itself, which is why you must override the onSuccess / onFailure methods.
 *
 * @param requestUrl Absolute URL if the user sends an absolute url that starts with http:// or https:// Otherwise, URL relative to the IBM MobileFirst Platform Server
 * @param parameters The request parameters
 * @param headers The request headers
 * @param timeout o supply custom timeout, use a number over 0. If the number is under 0, IBM MobileFirst Platform uses the default timeout, which is 10,000 milliseconds.
 * @param method The HTTP method that you must use. Acceptable values are GET, POST.The default value is POST.
 **/
-(void) submitLoginForm: (NSString *)requestUrl requestParameters:(NSDictionary *) parameters requestHeaders:(NSDictionary *) headers requestTimeoutInMilliSeconds:(int) timeout requestMethod:(NSString *) method;


/**
 * This method is the success delegate for submitLoginForm
 *
 * This method is called when a successful HTTP response is received (200 OK). This method does not indicate whether the challenge was successful or not. A 200 HTTP response can flow back indicating problems with authentication on the server or requesting additional information.
 *
 * Some examples of a 200 HTTP response are as follows:
 *
 *  - First init request returns a normal 200 HTTP response that requests a pkms login form
 * Authentication failed on the server.
 *  - A 200 HTTP response, indicating that the account is locked on the server due to too many failed login attempts.
 *
 * This is a good place to check whether the response is a custom response and handle it accordingly. If the response is not a custom response, you can call submitSuccess to indicate that all is good from your challenge handler's perspective, and that IBM MobileFirst Platform can handle the response instead.
 * @note  IBM MobileFirst Platform does not attempt to determine what the 200 response means.
 * @param response The received response.
 **/
-(void) onSuccess:(WLResponse *)response;


/**
 * This method is the failure delegate for submitLoginForm
 *
 * This method is called when a response does not have a 200 HTTP status code. This method does not indicate whether the challenge was successful or not. In some cases onFailure is an indication of a normal challenge handling sequence.
 *
 * An example of when the onFailure method is called is when a 401 Unauthorized response is received.
 *
 * A successful handshake can entail several 401 response iterations and therefore several onFailure calls. This behavior is all part of the normal handshake between two parties that are trying to establish identity. IBM MobileFirst Platform handles the handshakes for core challenges iteratively until all of the credentials are established and the necessary challenges are processed.
 *
 * This is a good place to check whether the response is a custom response and handle it accordingly. If the response is not a custom response, you can call submitSuccess to indicate that all is good from your challenge handler's perspective, and that IBM MobileFirst Platform can handle the response instead.
 *
 * @param response The received fail response.
 **/
-(void) onFailure:(WLFailResponse *)response;



@end
