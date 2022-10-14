import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { IEnvironmentVariables } from '../common/types';

export const getMongoConfig = async (
  config: ConfigService<IEnvironmentVariables>
): Promise<MongooseModuleFactoryOptions> => ({
  uri: getMongoURI(config),
});

const getMongoURI = (config: ConfigService<IEnvironmentVariables>): string =>
  'mongodb+srv://' +
  config.get('MONGO_LOGIN', { infer: true }) +
  ':' +
  config.get('MONGO_PASSWORD', { infer: true }) +
  '@' +
  config.get('MONGO_HOST', { infer: true }) +
  '/?retryWrites=true&w=majority';

export const collectionNames = {
  MATERIAL: 'materials',
  TYPE: 'types',
  TAG: 'tags',
  USER: 'users',
  RECYCLE_POINT: 'recyclePoints',
  BIN: 'bins',
  RULE: 'rules',
  AUTH_CONFIRM: 'authConfirms',
  AUTH_SESSION: 'authSessions',
  RULE_SET: 'ruleSets',
} as const;
