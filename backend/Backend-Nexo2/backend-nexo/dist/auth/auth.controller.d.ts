import { AuthService } from './auth.service';
import { VerifyTokenDto } from './dto/verify-token.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: CreateAuthDto): Promise<{
        message: string;
        username: string;
    }>;
    confirmToken(verifyTokenDto: VerifyTokenDto): Promise<{
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
