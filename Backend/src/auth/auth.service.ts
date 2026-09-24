import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service.js';
import bcrypt from 'bcryptjs';

type safeUser = Omit<User, 'password'>;
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private userService : UserService
  ) {}

  async SignIn(
    email: string,
    pass: string,
  ): Promise<{ accessToken: string, payload : any }> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException()
    const isAuthenticated =await bcrypt.compare(pass, user.password);

    if (!isAuthenticated) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, username: user.username, email : user.email };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      payload
    };
  }

  async register(
    username: string,
    email : string,
    password: string,
  ): Promise<{ accessToken: string, payload : any }> {
    const userData =  {
      username,
      email,
      password
    }
    const user = await this.userService.createUser(userData)

    if (!user) throw new Error('Error occur while register');

    const payload = { id: user.id, email : user.email, username: user.username };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      payload
    };
  }

  async googleRegister(
    username: string,
    email: string,
  ) : Promise<{ accessToken: string, payload : any }>{
    const userData =  {
      username,
      email,
      password: 'Google Auth'
    }
    const user = await this.userService.createIfNew(userData)

    if (!user) throw new Error('Error occur while register');

    const payload = { id: user.id, email : user.email, username: user.username };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      payload
    };
  }
}
