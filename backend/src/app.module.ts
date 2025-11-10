import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmailModule } from './shared/email/email.module'; 
import { CategoryModule } from './category/category.module';
import { CompanyModule } from './company/company.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }), 
    PrismaModule, 
    AuthModule,
    EmailModule,
    CategoryModule,
    CompanyModule,
    ProductModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
