import { CreateCompanyDto } from './dto/create-company.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class CompanyService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(id: string, createCompanyDto: CreateCompanyDto): import(".prisma/client").Prisma.Prisma__CompanyClient<{
        name: string;
        url: string;
        id: string;
        created_at: Date;
        updated_at: Date;
        description: string | null;
        category_id: string | null;
        owner_account_id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        url: string;
        id: string;
        created_at: Date;
        updated_at: Date;
        description: string | null;
        category_id: string | null;
        owner_account_id: string;
    }[]>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__CompanyClient<{
        name: string;
        url: string;
        id: string;
        created_at: Date;
        updated_at: Date;
        description: string | null;
        category_id: string | null;
        owner_account_id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
