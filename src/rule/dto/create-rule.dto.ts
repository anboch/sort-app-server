import { IsString } from 'class-validator';

export class CreateRuleDto {
  @IsString()
  description: string;
}
