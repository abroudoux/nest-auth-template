import { Post, Get, Controller, Body, UseGuards, Req } from "@nestjs/common";

import { AuthService } from "@/auth/auth.service";
import { JwtAuthGuard } from "@/auth/jwt.auth-guard";
import { RequestWithUser } from "@/auth/jwt.strategy";
import { UsersService } from "@/users/users.service";


export type AuthBody = { email : string, password : string };
export type CreateUser = { email : string, firstName : string, password : string };

@Controller('auth')
export class AuthController {

    constructor (private readonly authService : AuthService, private readonly userService : UsersService) {};

    @Post('login')
    async login(@Body() authBody : AuthBody) {
        return await this.authService.login({ authBody });
    };

    @Post('register')
    async register(@Body() registerBody : CreateUser) {
        return await this.authService.register({ registerBody });
    };

    @UseGuards(JwtAuthGuard)
    @Get()
    async authenticateUser(@Req() request : RequestWithUser) {
        return await this.userService.getUser({ userId : request.user.userId });
    };

};
