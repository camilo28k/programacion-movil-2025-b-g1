import { VerifyTokenDto } from './dto/verify-token.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/shared/email/email.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
export declare class AuthService {
    private prisma;
    private emailService;
    private jwtService;
    constructor(prisma: PrismaService, emailService: EmailService, jwtService: JwtService);
    private generateToken;
    registerAndSendToken(createAuthDto: CreateAuthDto): Promise<{
        message: string;
        username: string;
    }>;
    activateAccount(verifyTokenDto: VerifyTokenDto): Promise<{
        message: string;
    }>;
    login(loginAuthDto: LoginAuthDto): Promise<{
        access_token: string;
        user: {
            id: string;
            username: string;
            role: string;
            email: string;
            first_names: string;
        };
    }>;
    resendToken(email: string): Promise<{
        message: string;
    }>;
}
