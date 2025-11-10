import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  // 👇 convierte automáticamente a number antes de validar
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @IsOptional()
  @IsBoolean()
  is_promotion?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  promotion_price?: number;

  @IsOptional()
  @IsString()
  url?: string;

  @IsString()
  company_id: string;
}
