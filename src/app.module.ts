import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/users.entity';
import { MessagesModule } from './messages/messages.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync(
      {
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USERNAME || 'wrl',
        password: process.env.DB_PASSWORD || 'internship',
        database: process.env.DB_DATABASE || 'authentication',
        entities: [User], // entity classes
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// entities: [join(process.cwd(), 'dist/**/*.entity.js')],
