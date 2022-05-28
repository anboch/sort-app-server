import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateUserDto {
  @IsBoolean()
  isAdmin: boolean;

  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  recyclePointIDs?: string[];

  @IsOptional()
  @IsString()
  address?: string;
}
