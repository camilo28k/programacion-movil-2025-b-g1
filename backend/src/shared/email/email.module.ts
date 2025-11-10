import { Module } from '@nestjs/common';
import { EmailService } from './email.service';


@Module({
  // Proveedores: Aquí registramos el servicio que vive en este módulo
  providers: [EmailService],
  
  // Exportaciones: CLAVE - Hacemos que EmailService sea visible y
  // esté disponible para ser inyectado en módulos que importen EmailModule
  exports: [EmailService], 
})
export class EmailModule {}