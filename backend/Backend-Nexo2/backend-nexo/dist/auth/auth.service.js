"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const email_service_1 = require("../shared/email/email.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(prisma, emailService, jwtService) {
        this.prisma = prisma;
        this.emailService = emailService;
        this.jwtService = jwtService;
    }
    generateToken() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    async registerAndSendToken(createAuthDto) {
        const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
        const token = this.generateToken();
        const role = await this.prisma.role.findUnique({ where: { name: createAuthDto.name_rol } });
        if (!role) {
            throw new common_1.BadRequestException(`El rol '${createAuthDto.name_rol}' no es válido o no existe.`);
        }
        try {
            const result = await this.prisma.$transaction(async (tx) => {
                const person = await tx.person.create({
                    data: {
                        first_names: createAuthDto.first_names,
                        last_names: createAuthDto.last_names,
                        email: createAuthDto.email,
                        phone: createAuthDto.phone,
                    },
                });
                const userAccount = await tx.userAccount.create({
                    data: {
                        username: createAuthDto.username,
                        password_hash: hashedPassword,
                        role_id: role.id,
                        person_id: person.id,
                        status: client_1.UserStatus.PENDING,
                    },
                });
                await tx.verificationToken.create({
                    data: {
                        token: token,
                        user_account_id: userAccount.id,
                        expires_at: new Date(Date.now() + 60000),
                    },
                });
                return { userAccount };
            });
            await this.emailService.sendToken(createAuthDto.email, token);
            return {
                message: `Registro exitoso. Se ha enviado el token de activación a ${createAuthDto.email}.`,
                username: result.userAccount.username,
            };
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.BadRequestException('El nombre de usuario o correo electrónico ya está registrado.');
            }
            throw new common_1.InternalServerErrorException('Error interno al registrar la cuenta.');
        }
    }
    async activateAccount(verifyTokenDto) {
        const { email, token } = verifyTokenDto;
        const personWithAccount = await this.prisma.person.findUnique({
            where: { email },
            include: {
                userAccount: {
                    include: { verificationToken: true },
                },
            },
        });
        const user = personWithAccount?.userAccount;
        if (!user || !user.verificationToken) {
            throw new common_1.BadRequestException('Cuenta no encontrada o token inválido/expirado.');
        }
        if (user.verificationToken.token !== token) {
            throw new common_1.UnauthorizedException('El código de activación ingresado es incorrecto.');
        }
        const now = new Date();
        if (now > user.verificationToken.expires_at) {
            throw new common_1.BadRequestException('El token ha expirado. Solicite uno nuevo.');
        }
        return this.prisma.$transaction(async (tx) => {
            await tx.userAccount.update({
                where: { id: user.id },
                data: { status: client_1.UserStatus.ACTIVE },
            });
            await tx.verificationToken.delete({
                where: { id: user.verificationToken.id },
            });
            return { message: '¡Cuenta activada exitosamente! Ya puede iniciar sesión.' };
        });
    }
    async login(loginAuthDto) {
        const { email, password } = loginAuthDto;
        const personWithAccount = await this.prisma.person.findUnique({
            where: { email },
            include: {
                userAccount: {
                    include: { role: { select: { name: true } } },
                },
            },
        });
        const userAccount = personWithAccount?.userAccount;
        if (!personWithAccount || !userAccount || !userAccount.password_hash) {
            throw new common_1.UnauthorizedException('Credenciales inválidas (Correo no encontrado).');
        }
        const isPasswordValid = await bcrypt.compare(password, userAccount.password_hash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Credenciales inválidas (Contraseña incorrecta).');
        }
        const payload = {
            sub: userAccount.id,
            email: personWithAccount.email,
            role: userAccount.role.name,
            username: userAccount.username,
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: userAccount.id,
                username: userAccount.username,
                role: userAccount.role.name,
                email: personWithAccount.email,
                first_names: personWithAccount.first_names,
            },
        };
    }
    async resendToken(email) {
        const person = await this.prisma.person.findUnique({
            where: { email },
            include: { userAccount: { include: { verificationToken: true } } },
        });
        if (!person || !person.userAccount) {
            throw new common_1.BadRequestException('El usuario no existe.');
        }
        const user = person.userAccount;
        if (user.status === client_1.UserStatus.ACTIVE) {
            throw new common_1.BadRequestException('La cuenta ya está activa.');
        }
        const newToken = this.generateToken();
        await this.prisma.verificationToken.upsert({
            where: { user_account_id: user.id },
            update: {
                token: newToken,
                expires_at: new Date(Date.now() + 60000),
            },
            create: {
                token: newToken,
                user_account_id: user.id,
                expires_at: new Date(Date.now() + 60000),
            },
        });
        await this.emailService.sendToken(email, newToken);
        return { message: 'Se ha enviado un nuevo token de activación.' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map