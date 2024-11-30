import { TaskStatus } from 'src/shared/taskStatus.enum';
import { Users } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity('tasks')
export class Tasks {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar')
  title: string;

  @Column('varchar')
  description: string;

  @Column('varchar')
  status: TaskStatus;

  @JoinColumn({ name: 'createdBy' })
  @ManyToOne(() => Users, (user) => user.tasks)
  createdBy: Relation<Users>;
}
