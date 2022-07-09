import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export type mongoId = Types.ObjectId;

export class ParamId {
  @IsMongoId()
  id: string;
}
