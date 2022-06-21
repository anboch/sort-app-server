import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsMilitaryTime,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Weekdays } from '../recycle-point.model';

class CoordinatesDto {
  @IsLatitude()
  @IsNumber()
  latitude: number;

  @IsLongitude()
  @IsNumber()
  longitude: number;
}

class PositionDto {
  @IsObject()
  @ValidateNested()
  @Type(() => CoordinatesDto)
  coordinates: CoordinatesDto;

  @IsOptional()
  @IsString()
  address?: string;
}

class PeriodDto {
  @IsMilitaryTime()
  start: string;

  @IsMilitaryTime()
  end: string;
}
class DailyScheduleDto {
  @IsEnum(Weekdays)
  day: Weekdays;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => PeriodDto)
  periods: PeriodDto[];
}
class OpeningHoursDto {
  @IsBoolean()
  dayAndNight: boolean;

  @IsArray()
  @ValidateIf((o) => o.dayAndNight === false)
  @ArrayMinSize(7)
  @ValidateNested({ each: true })
  @Type(() => DailyScheduleDto)
  weekSchedule: DailyScheduleDto[];
}

class ContactsDto {
  @IsUrl()
  site: string;
}

export class CreateRecyclePointDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => OpeningHoursDto)
  openingHours?: OpeningHoursDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ContactsDto)
  contacts?: ContactsDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PositionDto)
  position?: PositionDto;
}
