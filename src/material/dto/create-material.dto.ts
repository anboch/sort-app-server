import { IsArray, IsString, IsOptional, IsMongoId } from 'class-validator';

export class CreateMaterialDto {
  @IsArray()
  @IsString({ each: true })
  titles: string[];

  @IsArray()
  @IsString({ each: true })
  @IsMongoId()
  typeIDs: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsMongoId()
  similarMaterialIDs?: string[];

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsString()
  @IsMongoId()
  categoryID: string;

  @IsOptional()
  @IsString()
  @IsMongoId()
  clusterID?: string;
}
