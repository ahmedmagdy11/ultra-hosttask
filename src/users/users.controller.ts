import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post('register')
  async register(@Body() registerDTO: RegisterDto) {
    return await this.userService.register(registerDTO);
  }
}
