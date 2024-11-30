// auth-type.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const AuthType = (types: string[]) => SetMetadata('authTypes', types);
