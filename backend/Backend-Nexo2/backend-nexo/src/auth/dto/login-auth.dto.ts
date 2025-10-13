import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class LoginAuthDto {
    @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
    @IsEmail({}, { message: 'El formato del correo electrónico no es válido.' })
    email: string; // <-- CAMBIADO DE username A email

    @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    password: string;
}