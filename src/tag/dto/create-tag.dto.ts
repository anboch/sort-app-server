import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { TagGroup } from '../tag.model';

export class CreateTagDto {
  @IsArray()
  @IsString({ each: true })
  titles: string[];

  @IsOptional()
  @IsEnum(TagGroup)
  group?: TagGroup;
}
