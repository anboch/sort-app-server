import { IsArray, IsString, IsOptional } from 'class-validator';

export class CreateMaterialDto {
  @IsArray()
  @IsString({ each: true })
  titles: string[];

  @IsArray()
  @IsString({ each: true })
  typeIDs: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  similarMaterialIDs?: string[];

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsString()
  categoryID: string;

  @IsOptional()
  @IsString()
  clusterID?: string;
}
