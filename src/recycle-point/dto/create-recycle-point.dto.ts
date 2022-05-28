import { IsOptional, IsString } from 'class-validator';

export class CreateRecyclePointDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
