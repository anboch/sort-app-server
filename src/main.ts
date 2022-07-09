import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoExceptionFilter } from './common/mongo-exception.filter';

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
  await app.listen(PORT);
}
bootstrap();
