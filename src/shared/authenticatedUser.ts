import { Role } from './role.enum';

export class AuthenticatedUser {
  id: string;
  username: string;
  role: Role;
}
