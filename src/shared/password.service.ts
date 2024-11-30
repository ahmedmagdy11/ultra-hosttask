import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  async hashPassword(plainPassword: string): Promise<string> {
    return await bcrypt.hash(plainPassword, Number(process.env.SALT_ROUND));
  }

  async compareHash(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
