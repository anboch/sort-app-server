import { Prop } from '@nestjs/mongoose';

export class Position {
  @Prop()
  latitude: number;

  @Prop()
  longitude: number;
}
