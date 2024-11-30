import { Role } from 'src/shared/role.enum';

export interface ITokenPayload {
  id: string;
  role: Role;
  iat: number;
  exp: number;
}
