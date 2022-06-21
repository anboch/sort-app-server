import { Type } from 'class-transformer';
import {
  IsLatitude,
  IsNumber,
  IsLongitude,
  IsObject,
  ValidateNested,
  IsOptional,
  IsString,
} from 'class-validator';

export class CoordinatesDto {
  @IsLatitude()
  @IsNumber()
  latitude: number;

  @IsLongitude()
  @IsNumber()
  longitude: number;
}

export class PositionDto {
  @IsObject()
  @ValidateNested()
  @Type(() => CoordinatesDto)
  coordinates: CoordinatesDto;

  @IsOptional()
  @IsString()
  address?: string;
}
