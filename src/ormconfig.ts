import { DataSource } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { config } from 'dotenv';

config();

export const ormOptions: any = {
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'ultrahost',
  schema: process.env.DB_SCHEMA || 'public',
  entities: [
    `${__dirname}/**/entities/*.entity{.ts,.js}`,
    `${__dirname}/**/entities/*.view{.ts,.js}`,
  ],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  subscribers: ['dist/modules/**/*.subscriber.js'],
  migrations: ['dist/migrations/*.js'],
};

export const source = new DataSource(ormOptions);
export default registerAs('typeormConfig', () => ormOptions);
