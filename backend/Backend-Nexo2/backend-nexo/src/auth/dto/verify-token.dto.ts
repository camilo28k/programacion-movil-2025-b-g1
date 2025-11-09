import { IsNotEmpty, IsEmail, IsNumberString, Length } from 'class-validator';

export class VerifyTokenDto {

  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  @IsEmail({}, { message: 'El formato del correo electrónico no es válido.' })
  readonly email: string; 

 
  @IsNotEmpty({ message: 'El código de verificación es obligatorio.' })
  @IsNumberString({}, { message: 'El token debe contener solo números (dígitos).' })
  @Length(6, 6, { message: 'El token debe tener 6 dígitos exactos.' })
  readonly token: string;
}