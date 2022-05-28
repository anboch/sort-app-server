import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

export class CreateTypeDto {
  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  recyclePointIDs: string[];
}
