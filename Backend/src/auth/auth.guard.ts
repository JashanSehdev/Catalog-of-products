import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    console.log("token pass", token)
    try {
      const payload = await this.jwtService.verifyAsync(token);
      console.log('Payload', payload)
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies.access_token
  }
}
