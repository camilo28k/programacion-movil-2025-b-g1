import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  // 🧩 1️⃣ Cargar los certificados generados por mkcert
  const httpsOptions = {
    key: readFileSync(join(__dirname, '../secrets/localhost-key.pem')),
    cert: readFileSync(join(__dirname, '../secrets/localhost.pem')),
  };

  // 🧩 2️⃣ Crear la aplicación con HTTPS habilitado
  const app = await NestFactory.create(AppModule, { httpsOptions });

  // 🧩 3️⃣ Pipes globales (los tuyos)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // 🧩 4️⃣ Prefijo global para tus rutas
  app.setGlobalPrefix('api');

  // 🧩 5️⃣ Habilitar CORS para permitir llamadas desde Ionic
  app.enableCors({
    origin: 'https://localhost:8100', // Puerto donde corre tu app Ionic
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });

  // 🧩 6️⃣ Iniciar el servidor
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Servidor HTTPS corriendo en https://localhost:${port}`);
}
bootstrap();
