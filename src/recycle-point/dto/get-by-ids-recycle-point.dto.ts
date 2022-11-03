import { IsArray, ArrayMinSize, IsMongoId, IsOptional } from 'class-validator';

export class GetRecyclePointByIdsDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsMongoId({ each: true })
  recyclePointIds: string[];
}
