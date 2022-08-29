import { Request } from 'express';
import { cookieNames } from '../../common/types';

export const cookieExtractor = (req: Request): string | null => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[cookieNames.REFRESH_TOKEN];
  }
  return token;
};
