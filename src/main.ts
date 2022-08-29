import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoExceptionFilter } from './common/mongo-exception.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap(): Promise<void> {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  app.useGlobalFilters(new MongoExceptionFilter());
  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(cookieParser());
  await app.listen(PORT);
}
bootstrap();
