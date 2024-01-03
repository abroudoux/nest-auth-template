import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";


@Injectable()
export class UsersService {

    constructor (private readonly prisma : PrismaService) {};

    async getUsers() {

        const users = await this.prisma.user.findMany({
            select: {
                id: true,
                email: true, 
                firstName: true
            },
        });

        return users;
    };

    async getUser({ userId } : { userId : string }) {

        const users = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                email: true, 
                firstName: true
            },
        });

        return users;
    }

};
