import { mongoId } from '../../common/types';

export interface IJwtPayload {
  _id: string;
}

export interface IJwtRefreshPayload extends IJwtPayload {
  sessionId: mongoId;
}
