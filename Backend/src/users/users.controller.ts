import { Body, Controller, Post } from '@nestjs/common';
import { User, UsersService } from './users.service.js';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto/auth-credentials.dto.js';

type SafeUser = Omit<User, 'password'>;

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signUp(@Body() credentialsDto: AuthCredentialsDto): Promise<SafeUser> {
    const user = await this.usersService.createUser(
      credentialsDto.username,
      credentialsDto.password,
    );
    if(!user) throw new Error('Internal Server Error')

    const { password, ...safeUser } = user;
    return safeUser;
  }
}