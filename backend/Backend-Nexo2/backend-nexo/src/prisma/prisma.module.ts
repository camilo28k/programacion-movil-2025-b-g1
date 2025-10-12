import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Hacemos el módulo global para que el PrismaService esté disponible
// para inyección en cualquier otro módulo sin tener que importarlo.
@Global()
@Module({
  // Proveedores: Registramos el servicio que maneja la conexión
  providers: [PrismaService],
  
  // Exportaciones: CLAVE - Hacemos que PrismaService esté disponible 
  // para ser inyectado por otros módulos (AuthService, UserService, etc.)
  exports: [PrismaService], 
})
export class PrismaModule {}