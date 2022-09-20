import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export type mongoId = Types.ObjectId;

export class ParamId {
  @IsMongoId()
  id: string;
}

export interface IEnvironmentVariables {
  MONGO_LOGIN: string;
  MONGO_PASSWORD: string;
  MONGO_HOST: string;
  MONGO_PORT: number;
  MONGO_AUTHDATABASE: string;
  MIN_CONFIRM_DELAY_SEC: number;
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRES_IN: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES_IN: string;
  MAIL_HOST: string;
  MAIL_USER: string;
  MAIL_PASSWORD: string;
  MAIL_FROM: string;
  CLIENT_URL: string;
  SERVER_URL: string;
}

export const cookieNames = {
  REFRESH_TOKEN: 'refresh_token',
} as const;
