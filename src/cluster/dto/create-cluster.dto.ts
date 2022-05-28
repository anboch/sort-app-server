import { IsString } from 'class-validator';

export class CreateClusterDto {
  @IsString()
  title: string;
}
