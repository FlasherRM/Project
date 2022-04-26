"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setGlobalPrefix("/api/v1");
    app.use(session({
        secret: 'QWERTYUIOPASDFGHJKLZXCVBNM',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 120000
        }
    }));
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map