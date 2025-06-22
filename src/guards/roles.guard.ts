import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { Observable } from 'rxjs';
import {JwtService} from "@nestjs/jwt";
import { Request } from 'express';
import {IUser} from "../interfaces/user.interface";
import {jwtConstants} from "../static/privat/constants";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService) {
  }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    // console.log('context', context.getHandler());
    const token = this.extractTokenFromHeader(request);
    const userPayload = <IUser>await this.jwtService.verifyAsync<IUser>(token, {secret: jwtConstants.secret});
    // console.log('token', token);
    // console.log('userPayload - user from jwt', userPayload);
    return userPayload?.role === 'admin';
  }

  private extractTokenFromHeader(req: Request): string {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid Authorization header');
    }
    return token; // <- всегда string
  }

  // private extractTokenFromHeader(request: Request): string | undefined {
  //   const [type, token] = request.headers.authorization?.split(' ') ?? [];
  //   return type === 'Bearer' ? token: undefined;
  // }
}
