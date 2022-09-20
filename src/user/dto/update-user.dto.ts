import { Type } from 'class-transformer';
import { IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CoordinatesDto, PositionDto } from '../../maps/dto/maps.dto';

class CityDto {
  @IsObject()
  @ValidateNested()
  @Type(() => CoordinatesDto)
  coordinates: CoordinatesDto;

  @IsString()
  name: string;
}
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  // @IsOptional()
  // @IsArray()
  // @IsString({ each: true })
  // @IsMongoId({ each: true })
  // binIDs?: string[];

  // @IsOptional()
  // @IsArray()
  // @IsString({ each: true })
  // @IsMongoId({ each: true })
  // recyclePointIDs?: string[];

  // @IsOptional()
  // @IsObject()
  // @ValidateNested()
  // @Type(() => PositionDto)
  // position?: PositionDto;

  // @IsOptional()
  // @IsObject()
  // @ValidateNested()
  // @Type(() => CityDto)
  // city?: CityDto;
}
