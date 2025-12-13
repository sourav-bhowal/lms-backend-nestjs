import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the request object
    const request: Request = context.switchToHttp().getRequest();

    // Extract the token from the header
    const token = this.extractTokenFromHeader(request);

    // If the token is not found, throw an unauthorized exception
    if (!token) {
      throw new UnauthorizedException();
    }
    // Try to verify the token
    try {
      // Verify the token
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      // Assign the payload to the request object
      request.user = payload;
    } catch (error) {
      // If the token is invalid, throw an unauthorized exception
      throw new UnauthorizedException(error);
    }
    // Return true if the token is valid
    return true;
  }

  // Extract the token from the header
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
}
