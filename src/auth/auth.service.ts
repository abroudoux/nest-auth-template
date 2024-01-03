import { Injectable } from "@nestjs/common";
import { hash, compare } from "bcrypt";

import { AuthBody } from "@/auth/auth.controller";
import { PrismaService } from "@/prisma/prisma.service";


@Injectable()
export class AuthService {

    constructor (private readonly prisma : PrismaService) {};

    private async hashPassword({ password } : { password : string }) {
        const hashedPassword = await hash(password, 10);
        return hashedPassword;
    };

    private async isPasswordValid({ password, hashedPassword } : { password : string, hashedPassword : string }) {
        const isPasswordValid = await compare(password, hashedPassword);
        return isPasswordValid;
    };

    async login({ authBody } : { authBody : AuthBody }) {

        const { email, password } = authBody;
        const hashedPassword = await this.hashPassword({ password });

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

        return existingUser.id;
    };

};
