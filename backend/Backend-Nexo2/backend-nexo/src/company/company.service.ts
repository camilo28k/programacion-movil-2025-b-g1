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

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
