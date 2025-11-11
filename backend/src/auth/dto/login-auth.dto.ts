import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class LoginAuthDto {
    @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
    @IsEmail({}, { message: 'El formato del correo electrónico no es válido.' })
    email: string; // <-- CAMBIADO DE username A email

    @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
    password: string;
}