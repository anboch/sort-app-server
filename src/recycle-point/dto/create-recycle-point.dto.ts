import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsMilitaryTime,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { PositionDto } from '../../maps/dto/maps.dto';
import { Weekdays } from '../recycle-point.model';

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
  @IsOptional()
  site?: string;

  @IsUrl()
  @IsOptional()
  ecoTaxi?: string;
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
