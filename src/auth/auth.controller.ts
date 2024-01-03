import { Post, Controller, Body } from "@nestjs/common";

import { AuthService } from "@/auth//auth.service";


export type AuthBody = { 
    email : string, 
    password : string
};

@Controller('auth')
export class AuthController {

    constructor (private readonly authService : AuthService) {};

    @Post('login')
    async login(@Body() authBody : AuthBody) {
        return await this.authService.login({ authBody });
    };

};
