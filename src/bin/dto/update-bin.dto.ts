import { PartialType } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { CreateBinDto } from './create-bin.dto';

export class UpdateBinDto extends PartialType(CreateBinDto) {
  @IsMongoId()
  _id: string;
}
