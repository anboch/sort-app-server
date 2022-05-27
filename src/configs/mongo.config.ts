import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
  configService: ConfigService
): Promise<MongooseModuleFactoryOptions> => ({
  uri: getMongoURI(configService),
});

const getMongoURI = (configService: ConfigService): string =>
  'mongodb://' +
  configService.get('MONGO_LOGIN') +
  ':' +
  configService.get('MONGO_PASSWORD') +
  '@' +
  configService.get('MONGO_HOST') +
  ':' +
  configService.get('MONGO_PORT') +
  '/' +
  configService.get('MONGO_AUTHDATABASE');

export const collectionNames = {
  MATERIAL: 'materials',
  TYPE: 'types',
  CLUSTER: 'clusters',
  USER: 'users',
  RECYCLE_POINT: 'recyclePoints',
  BIN: 'bins',
  CATEGORY: 'categories',
};
