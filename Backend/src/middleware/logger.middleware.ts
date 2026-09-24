
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  async use(req: Request & {user: any}, res: Response, next: NextFunction) {
    const token = this.extractTokenFromCookie(req);
        if (!token) {
          throw new UnauthorizedException();
        }
        console.log("token pass", token)
        try {
          const payload = await this.jwtService.verifyAsync(token);
          console.log('Payload', payload)
          req['user'] = payload;
        } catch (error) {
          throw new UnauthorizedException();
        }
    
    next();
  }
   private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies.access_token
  }
}
