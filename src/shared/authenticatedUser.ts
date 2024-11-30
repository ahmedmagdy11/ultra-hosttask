import { Role } from './role.enum';

export class IAuthenticatedUser {
  id: string;
  username: string;
  role: Role;
}
