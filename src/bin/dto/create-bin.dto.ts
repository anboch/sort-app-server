import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateBinDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsMongoId()
  typeID: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  preferRPIDs?: string[];
}
