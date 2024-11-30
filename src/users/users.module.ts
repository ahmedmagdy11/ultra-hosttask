import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';
import { PasswordService } from 'src/shared/password.service';
import { JWTAuthService } from 'src/shared/jwt-auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([Users]), JwtModule],
  providers: [UsersService, PasswordService, JWTAuthService],
})
export class UsersModule {}
