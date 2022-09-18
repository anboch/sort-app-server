import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateBinDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsMongoId()
  typeID: string;

  @ApiProperty()
  @IsMongoId()
  ruleSetID: string;
}
