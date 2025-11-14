"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
async function bootstrap() {
    const httpsOptions = {
        key: (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../secrets/localhost-key.pem')),
        cert: (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../secrets/localhost.pem')),
    };
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { httpsOptions });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: 'https://localhost:8100',
        methods: 'GET,POST,PUT,DELETE',
        credentials: true,
    });
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(` Servidor HTTPS corriendo en https://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map