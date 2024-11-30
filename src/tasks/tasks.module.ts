import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './entities/tasks.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWTAuthService } from 'src/shared/jwt-auth.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, JWTAuthService],
  imports: [TypeOrmModule.forFeature([Tasks]), JwtModule],
})
export class TasksModule {}
