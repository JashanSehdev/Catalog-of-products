import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthGuard } from './auth.guard.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authServices : AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    SignIn(@Body() signInDto : Record <string, any>){
        return this.authServices.SignIn(signInDto.username, signInDto.password)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req : any){
        return req.user;
    }

}
