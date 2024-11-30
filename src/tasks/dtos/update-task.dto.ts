import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from 'src/shared/taskStatus.enum';

export class UpdateTaskDto {
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
