import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './shared/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        console.log(
          'Database Configuration:',
          configService.get('typeormConfig'),
        ); // Add this line
        return configService.get('typeormConfig');
      },
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME },
    }),
    UsersModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [JwtStrategy, AppService],
})
export class AppModule {}
