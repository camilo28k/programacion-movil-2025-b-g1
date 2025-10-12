import { IsNotEmpty, IsString, IsNumberString, Length } from 'class-validator';

export class VerifyTokenDto {
  
  // 1. Nombre de Usuario
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio.' })
  @IsString()
  readonly username: string; 

  // 2. Token de Verificación
  // 2. Token de Verificación
@IsNotEmpty({ message: 'El código de verificación es obligatorio.' })

// CÓDIGO CORREGIDO: Sin el { message: '...' }
@IsNumberString() 
 
// Este decorador maneja el mensaje de error de longitud
@Length(6, 6, { message: 'El token debe tener 6 dígitos exactos.' })
readonly token: string;
}