import { IsOptional, IsString } from 'class-validator';

export class CreateBinDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  typeID: string;
}
