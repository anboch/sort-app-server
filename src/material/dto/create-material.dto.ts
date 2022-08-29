import { IsArray, IsString, IsOptional, IsMongoId } from 'class-validator';

export class CreateMaterialDto {
  @IsArray()
  @IsString({ each: true })
  titles: string[];

  @IsArray()
  @IsMongoId({ each: true })
  typeIDs: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  similarMaterialIDs?: string[];

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  tagIDs?: string[];
}
