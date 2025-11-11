import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompanyService {

  constructor(private prismaService:PrismaService){}
  create(id: string, createCompanyDto: CreateCompanyDto) {
    console.log(' Creating company for user:', id, createCompanyDto);
    return this.prismaService.company.create({
      data: {
        name: createCompanyDto.name,
        description: createCompanyDto.description,
        url: createCompanyDto.url,
        owner_account_id: id,
        category_id: createCompanyDto.category_id,

      }
    })
  }

  findAll() {
    return this.prismaService.company.findMany();
  }


  remove(id: string) {
    return this.prismaService.company.delete({
      where: {id}
    })
  }
}
