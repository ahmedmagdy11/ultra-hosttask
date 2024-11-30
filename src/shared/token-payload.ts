import { Role } from 'src/role.enum';

export interface ITokenPayload {
  id: string;
  role: Role;
  iat: number;
  exp: number;
}
