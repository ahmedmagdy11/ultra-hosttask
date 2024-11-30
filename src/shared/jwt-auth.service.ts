import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload } from './token-payload';

@Injectable()
export class JWTAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: ITokenPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRE_IN,
    });
  }
  getPayload(token: string): ITokenPayload {
    return this.jwtService.decode(token);
  }

  async verifyToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
