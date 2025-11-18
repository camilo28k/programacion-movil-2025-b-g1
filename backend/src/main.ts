import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {

  // ❌ Sin HTTPS local — ngrok ya da HTTPS real
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Pipes globales
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Prefijo global
  app.setGlobalPrefix('api');

  // ✔ CORS actualizado con tu nueva URL pública de ngrok
  app.enableCors({
    origin: [
      'https://pricey-grizzly-bethany.ngrok-free.dev',  // ← TU NUEVO TÚNEL
      'http://localhost:8100',
      'https://localhost:8100'
    ],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });

  // Archivos estáticos
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Servidor HTTP local
  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');  // necesario para ngrok
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
}

bootstrap();
