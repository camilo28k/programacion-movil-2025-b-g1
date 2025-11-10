import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Emprendedor')
  @Post()
  create(
    @GetUser('sub') id: string, // id del usuario autenticado
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.create(id, createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
