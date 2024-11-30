import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './entities/tasks.entity';
import { IAuthenticatedUser } from 'src/shared/authenticatedUser';
import { TaskStatus } from 'src/shared/taskStatus.enum';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { Role } from 'src/shared/role.enum';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Tasks) private readonly tasksRepository) {}
  async createTask(body: CreateTaskDto, user: IAuthenticatedUser) {
    const task = this.tasksRepository.create({
      ...body,
      createdBy: {
        id: user.id,
      },
      status: TaskStatus.Pending,
    });
    return await this.tasksRepository.save(task);
  }

  async getAllTasks() {
    return await this.tasksRepository.find();
  }

  async getTasksByUser(userId: string) {
    return await this.tasksRepository.find({
      where: {
        createdBy: {
          id: userId,
        },
      },
    });
  }

  async updateTask(id: string, body: UpdateTaskDto, user: IAuthenticatedUser) {
    const whereQuery: FindOptionsWhere<Tasks> = {
      id: id,
    };
    if (user.role === Role.User) {
      whereQuery.createdBy = {
        id: user.id,
      };
    }
    console.log(whereQuery);
    const task = await this.tasksRepository.findOne({ where: whereQuery });
    if (!task) {
      throw new Error();
    }
    await this.tasksRepository.update(whereQuery, {
      status: body.status,
    });
  }

  async deleteTask(id: string) {
    const task = await this.tasksRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!task) {
      throw new Error();
    }
    await this.tasksRepository.delete(id);
  }
}
