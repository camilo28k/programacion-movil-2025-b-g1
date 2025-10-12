// src/auth/dto/register.dto.ts

import { IsString, IsEmail, IsNotEmpty, MinLength, IsOptional, IsIn, Matches } from "class-validator";
// Nota: 'class-transformer' no es necesario si solo usas IsString, IsEmail, etc.

export class CreateAuthDto {
    // Datos de la tabla PERSON
    @IsNotEmpty()
    @IsString()
    first_names: string; // Corregido: Usar plural/singular según tu esquema Prisma

    @IsNotEmpty()
    @IsString()
    last_names: string;

    @IsEmail()
    // 🔑 REGLA DE NEGOCIO: Dominio obligatorio
    
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsOptional()
    phone?: string

    // Datos de la tabla USER_ACCOUNT / COMPANY
    // Usado como Nombre de usuario y Nombre de la empresa (si aplica)
    @IsNotEmpty()
    @IsString()
    username: string; 

    // CLAVE: Recibimos la contraseña simple
    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
    password: string; // Corregido: Renombrado de password_hash a password

    // Datos para el ROL
    @IsNotEmpty()
    @IsString()
    @IsIn(['Emprendedor', 'Comprador', 'Admin'], { message: "El rol debe ser 'Emprendedor' o 'Comprador'." })
    name_rol: string; 
}
