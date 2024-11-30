import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from 'src/shared/role.enum';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: string;
}
