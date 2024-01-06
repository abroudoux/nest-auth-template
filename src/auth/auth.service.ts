import { Injectable } from "@nestjs/common";
import { hash, compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";

import { AuthBody } from "@/auth/auth.controller";
import { UserPayload } from "@/auth/jwt.strategy";
import { PrismaService } from "@/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";


@Injectable()
export class AuthService {

    constructor (private readonly prisma : PrismaService, private readonly jwtService : JwtService) {};

    private async hashPassword({ password } : { password : string }) {
        const hashedPassword = await hash(password, 10);
        return hashedPassword;
    };

    private async isPasswordValid({ password, hashedPassword } : { password : string, hashedPassword : string }) {
        const isPasswordValid = await compare(password, hashedPassword);
        return isPasswordValid;
    };

    private async authenticateUser({ userId } : UserPayload) {
        const payload : UserPayload = { userId };
        return { 
            access_token : await this.jwtService.sign(payload), 
        };
    };

    async login({ authBody } : { authBody : AuthBody }) {

        const { email, password } = authBody;

        const existingUser = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!existingUser) {
            throw new Error('User didn\'t exist !');
        };

        const isPasswordValid = await this.isPasswordValid({ password, hashedPassword : existingUser.password });

        if (!isPasswordValid) {
            throw new Error('Password is not the same !')
        };

        return await this.authenticateUser({ userId : existingUser.id });
    };

    async register({ registerBody } : { registerBody : CreateUserDto }) {

        try {
            const { email, firstName, password } = registerBody;
            const existingUser = await this.prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (existingUser) {
                throw new Error('A user is already ewisting with this email !');
            };

            const hashedPassword = await this.hashPassword({ password });
            const createdUser = await this.prisma.user.create({ data : { email, password : hashedPassword, firstName } })

            return this.authenticateUser({ userId : createdUser.id });

        } catch (error) {
            return {
                error : true,
                message : error.message,
            };
        };
    };

};
