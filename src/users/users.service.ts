import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { RegisterDto } from './dtos/register.dto';
import { PasswordService } from 'src/shared/password.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly usersRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async register(registerDto: RegisterDto) {
    registerDto.password = await this.passwordService.hashPassword(
      registerDto.password,
    );
    const user = this.usersRepository.create(registerDto);
    return await this.usersRepository.save(user);
  }
}
