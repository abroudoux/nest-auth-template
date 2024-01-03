import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "@/auth/auth.controller";
import { AuthService } from "@/auth/auth.service";
import { PrismaService } from "@/prisma/prisma.service";
import { JwtStrategy } from "@/auth/jwt.strategy";
import { UsersService } from "@/users/users.service";


@Module({
    imports: [
        JwtModule.register({
            global : true,
            secret : process.env.JWT_SECRET,
            signOptions : { expiresIn : '30d' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersService, PrismaService, JwtStrategy]
})
export class AuthModule {};
