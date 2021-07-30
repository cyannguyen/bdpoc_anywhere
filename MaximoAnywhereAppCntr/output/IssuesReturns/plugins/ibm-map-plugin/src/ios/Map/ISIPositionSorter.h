//
//  ISIPositionSorter.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 2/4/2014.
//
//

#import <Foundation/Foundation.h>
#import "ISILogger.h"

@interface ISIPositionSorter : NSObject

@property (readonly) NSMutableArray *positionList;

-(id) init;
+(id) positionSorter;

-(void) add:(double)latitudey longitudex:(double)longitudex uid:(NSInteger)uid;
-(int) getSize;
-(void) sort;
-(NSArray*) getUidArray;

@end
