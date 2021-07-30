//
//  ISIMapUIManagerRegistry.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 3/19/14.
//
//

#import <Foundation/Foundation.h>
#import "ISIMapUIManager.h"

@interface ISIMapUIManagerRegistry : NSObject

@property (nonatomic) ISIMapUIManager *mapManager;
+(id) instance;
-(void) register:(ISIMapUIManager*)aMapManager;

@end
