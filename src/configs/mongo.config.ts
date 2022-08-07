import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
  config: ConfigService
): Promise<MongooseModuleFactoryOptions> => ({
  uri: getMongoURI(config),
});

const getMongoURI = (config: ConfigService): string =>
  'mongodb://' +
  config.get('MONGO_LOGIN') +
  ':' +
  config.get('MONGO_PASSWORD') +
  '@' +
  config.get('MONGO_HOST') +
  ':' +
  config.get('MONGO_PORT') +
  '/' +
  config.get('MONGO_AUTHDATABASE');

export const collectionNames = {
  MATERIAL: 'materials',
  TYPE: 'types',
  TAG: 'tags',
  USER: 'users',
  RECYCLE_POINT: 'recyclePoints',
  BIN: 'bins',
  CATEGORY: 'categories',
  AUTH: 'auth',
};
