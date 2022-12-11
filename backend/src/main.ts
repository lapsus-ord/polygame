import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('APP_PORT') || 3000;

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(port);
}

bootstrap();
