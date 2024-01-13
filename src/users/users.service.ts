import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/prisma/prisma.service";
import { UpdateUserDto } from "@/auth/dto/update-user.dto";


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

    // async updateUser ({ userId } : { userId : string }, updateUserDto : UpdateUserDto) {
    //     const userUpdated = await this.prisma.user.findUnique({
    //         where: { userId },
    //     });

    //     if (!userUpdated) {
    //         throw new Error('User didn\'t found!');
    //     };

    //     return this.prisma.user.update({
    //         where: { userId },
    //         data: updateUserDto,
    //     });
    // };

};
