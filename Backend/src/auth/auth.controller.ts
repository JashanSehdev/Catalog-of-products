import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthGuard } from './auth.guard.js';
import { User } from '../users/users.service.js';
import { AuthCredentialsDto, GoogleCredentialDto } from './dto/auth-credentials.dto/auth-credentials.dto.js';
import type { Response } from 'express';
import { PassThrough } from 'stream';

type safeUser = Omit<User, 'password'>;
@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async SignIn(
    @Body() signInDto: Record<string, any>,
    @Res({ passthrough: true }) res: Response,
  ) {
    const access_token = await this.authServices.SignIn(
      signInDto.email,
      signInDto.password,
    );

    res.cookie('access_token', access_token.accessToken, {
      expires: new Date(new Date().getTime() + 120 * 1000),
      httpOnly: false,
      secure: true,
    });

    return access_token.payload;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(
    @Body() credentialsDto: AuthCredentialsDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const access_token = await this.authServices.register(
      credentialsDto.username,
      credentialsDto.email,
      credentialsDto.password,
      credentialsDto.role
    );

    res.cookie('access_token', access_token.accessToken, {
      expires: new Date(new Date().getTime() + 120 * 1000),
      httpOnly: true,
      secure: true,
    });

    return access_token.payload;
  }

  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('access_token', '');
    return { message: 'you have been logout' };
  }

  @Post('google')
  async login(@Body() credentialDto: GoogleCredentialDto, @Res({ passthrough: true }) res: Response ) {
    const access_token = await this.authServices.googleRegister(credentialDto.username, credentialDto.email, credentialDto.role);
    res.cookie('access_token', access_token.accessToken, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      httpOnly: false,
      secure: true,
    });

    return access_token.payload
  }
}
