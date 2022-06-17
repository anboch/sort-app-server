import { Type } from 'class-transformer';
import { IsDefined, IsLatitude, IsLatLong, IsLongitude, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Position } from '../recycle-point.model';

class PositionDto {
  @IsLatitude()
  @IsNumber()
  latitude: number
  
  @IsLongitude()
  @IsNumber()
  longitude: number
}

export class CreateRecyclePointDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  openingHours?: string;

  @IsOptional()
  @IsString()
  site?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PositionDto)
  position?: PositionDto;
}
