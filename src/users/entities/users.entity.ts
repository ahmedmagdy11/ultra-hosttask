import { Role } from 'src/shared/role.enum';
import { Tasks } from 'src/tasks/entities/tasks.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar')
  username: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  role: Role;

  @OneToMany(() => Tasks, (task) => task.createdBy)
  tasks: Tasks[];
}
