import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';
import { LoggerModule } from './logger/logger.module';
import { LoggerService } from './logger/services/logger.service';
import { Connection } from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [LoggerModule],
      useFactory: (logger: LoggerService) =>
        ({
          uri: 'mongodb://localhost:27017/smartedu',
          connectionFactory: (connection: Connection) => {
            connection.on('connected', () => {
              logger.log('MongoDB connected successfully');
            });
            return connection;
          },
        }) as MongooseModuleOptions,
      inject: [LoggerService],
    }),
    NotificationModule,
    LoggerModule,
  ],
})
export class AppModule {}
