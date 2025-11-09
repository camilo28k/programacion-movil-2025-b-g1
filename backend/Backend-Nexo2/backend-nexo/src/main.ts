import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync(join(__dirname, '../secrets/localhost-key.pem')),
    cert: readFileSync(join(__dirname, '../secrets/localhost.pem')),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: 'https://localhost:8100',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(` Servidor HTTPS corriendo en https://localhost:${port}`);
}
bootstrap();
