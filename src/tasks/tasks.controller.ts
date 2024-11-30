import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthType } from 'src/shared/auth-type.decorator';
import { AuthGuard } from 'src/shared/auth.guard';
import { AuthenticatedUser } from 'src/shared/authenticated-user.decorator';
import { IAuthenticatedUser } from 'src/shared/authenticatedUser';
import { Role } from 'src/shared/role.enum';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Post()
  @AuthType([Role.Admin, Role.User])
  async createTask(
    @Body() body: CreateTaskDto,
    @AuthenticatedUser() user: IAuthenticatedUser,
  ) {
    return await this.tasksService.createTask(body, user);
  }

  @Get()
  @AuthType([Role.Admin])
  async getAllTasks() {
    return await this.tasksService.getAllTasks();
  }

  @Get('user')
  @AuthType([Role.User, Role.Admin])
  async getTasksByUser(@AuthenticatedUser() user: IAuthenticatedUser) {
    return await this.tasksService.getTasksByUser(user.id);
  }

  @Put('/:id')
  @AuthType([Role.Admin, Role.User])
  async updateTask(
    @Param('id') id: string,
    @Body() body: UpdateTaskDto,
    @AuthenticatedUser() user: IAuthenticatedUser,
  ) {
    return await this.tasksService.updateTask(id, body, user);
  }

  @Delete('/:id')
  @AuthType([Role.Admin])
  async deleteTask(@Param('id') id: string) {
    return await this.tasksService.deleteTask(id);
  }
}
