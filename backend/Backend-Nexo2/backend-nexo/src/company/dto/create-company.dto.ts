import { IsOptional, IsString, IsUUID } from "class-validator"

export class CreateCompanyDto {
    @IsString()
    name: string
    @IsString()
    description?: string
    @IsString()
    url: string
    @IsOptional()
    @IsUUID()
    category_id?: string;
}
