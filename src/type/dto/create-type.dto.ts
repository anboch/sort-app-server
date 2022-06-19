import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsString, ValidateNested } from 'class-validator';

export class CreateTypeDto {
  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  @IsMongoId({ each: true })
  recyclePointIDs: string[];
}
