import { IsString, IsEmail, IsNotEmpty, MinLength, IsOptional, IsIn, Matches } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  first_names: string;

  @IsNotEmpty()
  @IsString()
  last_names: string;

  @IsEmail()
  @Matches(/@corhuila\.edu\.co$/, {
    message: 'Solo se permiten correos con el dominio @corhuila.edu.co',
  })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty({ message: 'El teléfono es obligatorio.' })
  @IsString()
  phone: string;


  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['Emprendedor', 'Comprador', 'Admin'], { message: "El rol debe ser 'Emprendedor' o 'Comprador'." })
  name_rol: string;
}
