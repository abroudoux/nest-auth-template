import { Injectable } from "@nestjs/common";

import { AuthBody } from "@/auth/auth.controller";
import { PrismaService } from "@/prisma/prisma.service";


@Injectable()
export class AuthService {

    constructor (private readonly prisma : PrismaService) {};

    async login({ authBody } : { authBody : AuthBody }) {

        const { email, password } = authBody;

        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: authBody.email,
            },
        });

        if (!existingUser) {
            throw new Error('User didn\'t exist !');
        };

        const isPasswordSame = password === existingUser.password;

        if (!isPasswordSame) {
            throw new Error('Password is not the same !')
        };

        return existingUser;
    };

};
