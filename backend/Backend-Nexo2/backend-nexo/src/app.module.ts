import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // <-- Importar ConfigModule
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmailModule } from './shared/email/email.module'; // <-- Asegúrate de tener EmailModule

@Module({
  imports: [
    // CLAVE: Cargar y hacer global el ConfigModule
    ConfigModule.forRoot({
      isGlobal: true, 
    }), 
    PrismaModule, 
    AuthModule,
    EmailModule, // Asegúrate de que el EmailModule esté aquí
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
