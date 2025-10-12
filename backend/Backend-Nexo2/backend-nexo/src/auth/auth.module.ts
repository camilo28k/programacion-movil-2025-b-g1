import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmailModule } from 'src/shared/email/email.module';
// Importa el servicio de correo
// Nota: No necesitamos importar PrismaModule ni listar PrismaService en providers 
// si marcaste PrismaModule con @Global().

@Module({
  // Importa EmailModule para que AuthService pueda inyectar EmailService
  imports: [EmailModule], 
  
  // Controladores: Las rutas HTTP
  controllers: [AuthController],
  
  // Proveedores: La lógica de negocio
  providers: [
    AuthService, 
    // Aquí podrías listar PrismaService si no usas @Global() en PrismaModule.
  ],
})
export class AuthModule {}
