import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsMongoId, IsString, ValidateNested } from 'class-validator';

class WayDto {
  @IsMongoId()
  recyclePointID: string;

  @IsArray()
  @IsMongoId({ each: true })
  rules: string[];
}
export class CreateTypeDto {
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => WayDto)
  ways: WayDto;
}
