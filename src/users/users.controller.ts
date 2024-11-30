import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post('register')
  async register(@Body() registerDTO: RegisterDto) {
    return await this.userService.register(registerDTO);
  }

  @Post('/login')
  async loging(@Body() loginDTO: LoginDto) {
    return await this.userService.login(loginDTO);
  }
}
