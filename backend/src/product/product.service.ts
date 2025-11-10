import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService:PrismaService){}

  async create(userId: string, createProductDto: CreateProductDto) {
    console.log('Creating product for user:', userId, createProductDto);

    // OJO: aquí puedes validar que la company pertenece al userId antes de crear
    // (seguridad adicional)
    const company = await this.prismaService.company.findFirst({
      where: {
        id: createProductDto.company_id,
        owner_account_id: userId,
      },
    });

    if (!company) {
      throw new Error('No tienes permiso para crear productos en esta compañía');
    }

    return this.prismaService.product.create({
      data: {
        title: createProductDto.title,
        description: createProductDto.description,
        price: new Prisma.Decimal(createProductDto.price),
        is_promotion: createProductDto.is_promotion ?? false,
        promotion_price: createProductDto.promotion_price
          ? new Prisma.Decimal(createProductDto.promotion_price)
          : undefined,
        url: createProductDto.url,
        company_id: createProductDto.company_id,
      },
    });
  }

  findAll() {
    return this.prismaService.product.findMany();
  }

  remove(id: string) {
    return this.prismaService.product.delete({
      where: {id}
    })
  }
}
