import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { RegisterDto } from './dtos/register.dto';
import { PasswordService } from 'src/shared/password.service';
import { LoginDto } from './dtos/login.dto';
import { JWTAuthService } from 'src/shared/jwt-auth.service';
import { ITokenPayload } from 'src/shared/token-payload';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly usersRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JWTAuthService,
  ) {}

  async register(registerDto: RegisterDto) {
    registerDto.password = await this.passwordService.hashPassword(
      registerDto.password,
    );
    const user = this.usersRepository.create(registerDto);
    return await this.usersRepository.save(user);
  }

  async login(body: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: {
        username: body.username,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    const isPasswordMatch = await this.passwordService.compareHash(
      body.password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new NotFoundException();
    }
    return {
      ...user,
      password: undefined,
      token: await this.jwtService.generateToken({
        id: user.id,
        role: user.role,
      } as ITokenPayload),
    };
  }
}
