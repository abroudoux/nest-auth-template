import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "@/app/app.controller";
import { AppService } from "@/app/app.service";
import { UsersModule } from "@/users/users.module";
import { AuthModule } from "@/auth/auth.module";


@Module({
    imports: [
        UsersModule, 
        AuthModule, 
        ConfigModule.forRoot({
            isGlobal : true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {};
