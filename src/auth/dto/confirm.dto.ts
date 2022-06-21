import { IsEmail, IsNumber, IsString } from 'class-validator';

export class ConfirmDto {
  @IsEmail()
  email: string;

  @IsString()
  confirmCode: string;
}
