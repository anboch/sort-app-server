import { Prop } from '@nestjs/mongoose';

export class Coordinates {
  @Prop()
  latitude: number;

  @Prop()
  longitude: number;
}

export class Position {
  @Prop()
  coordinates: Coordinates;

  @Prop()
  address?: string;
}
