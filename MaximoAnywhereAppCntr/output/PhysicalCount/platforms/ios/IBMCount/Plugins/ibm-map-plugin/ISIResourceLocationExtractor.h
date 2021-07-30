//
//  ISIResourceLocationExtractor.h
//  AnywhereWorkManagementWorkExecutionIphone
//
//  Created by Leandro Cassa on 3/31/14.
//
//

#import <Foundation/Foundation.h>
#import "ISIRectD.h"

@interface ISIResourceLocationExtractor : NSObject

@property (readonly) NSString *xPositionAttribute;
@property (readonly) NSString *yPositionAttribute;
@property (readonly) ISIRectD *mapBounds;

-(id)initWithMapBounds:(ISIRectD*) mapBounds;
+(id)resourceLocationExtractorWithMapBounds:(ISIRectD*) mapBounds;

-(NSArray *)getLocalizedResources:(NSArray *)jsonArray outResourceIndex: (NSInteger) outResourceIndex;

@end
