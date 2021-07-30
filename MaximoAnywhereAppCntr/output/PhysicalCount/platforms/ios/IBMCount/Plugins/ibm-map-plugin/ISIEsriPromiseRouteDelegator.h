//
//  ISIEsriPromiseRouteDelegator.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 17/4/2014.
//
//

#import <Foundation/Foundation.h>
#import <ArcGIS/ArcGIS.h>
#import "ISIPromise.h"

@protocol ISIEsriPromiseRouteProtocol <NSObject>

-(void) routeTask:(AGSRouteTask *)routeTask operation:(NSOperation *)op didSolveWithResult:(AGSRouteTaskResult *)routeTaskResult promise:(ISIPromise*)promise;
-(void) routeTask:(AGSRouteTask *)routeTask operation:(NSOperation *)op didFailSolveWithError:(NSError *)error promise:(ISIPromise*)promise;

@end

@interface ISIEsriPromiseRouteDelegator : NSObject <AGSRouteTaskDelegate>

@property ISIPromise *promise;
@property (nonatomic) id<ISIEsriPromiseRouteProtocol> delegate;


-(id) initWithPromise:(ISIPromise*)promise;

@end
