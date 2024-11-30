import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Reflector } from '@nestjs/core';
import { JWTAuthService } from './jwt-auth.service';
import { Users } from 'src/users/entities/users.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(DataSource) private readonly dataSource: DataSource,
    private readonly jwtAuthService: JWTAuthService,
    private readonly reflcator: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      throw new UnauthorizedException('UNAUTHENTICATED');
    }

    if (!request.headers.authorization.startsWith('Bearer')) {
      throw new UnauthorizedException('UNAUTHENTICATED');
    }

    try {
      const token: string = request.headers.authorization.slice(7);

      const result = await this.jwtAuthService.verifyToken(token);

      if (!result) {
        throw new UnauthorizedException('UNAUTHENTICATED');
      }
      const payload = this.jwtAuthService.getPayload(token);

      const user = await this.dataSource.getRepository(Users).findOne({
        where: {
          id: payload.id,
        },
      });
      if (!user) {
        throw new UnauthorizedException();
      }

      request.user = { ...payload, token, role: user.role };

      const authTypes = this.reflcator.get<[string]>(
        'authTypes',
        context.getHandler(),
      );
      console.log(authTypes);
      if (!authTypes || !authTypes.includes(user.role)) {
        throw new UnauthorizedException('UNAUTHENTICATED');
      }
      return true;
    } catch (err: any) {
      console.log(err);
      if (err.message === 'jwt expired') {
        throw new UnauthorizedException('TOKEN_EXPIRED_ERROR');
      }
      throw new UnauthorizedException('UNAUTHENTICATED');
    }
  }
}
