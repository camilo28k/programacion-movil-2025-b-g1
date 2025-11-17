import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la empresa es obligatorio.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'La descripción es obligatoria.' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'La URL de la imagen es obligatoria.' })
  url: string;

  @IsUUID()
  category_id: string;
}
