import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Explicit path to .env
      ignoreEnvFile: false, // Ensure it's not ignored
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => {
        const uri = 'mongodb://localhost:27017/notifybd';
        if (!uri) {
          throw new Error('MONGO_URI not found in configuration');
        }
        return { uri };
      },
      inject: [ConfigService],
    }),
    NotificationModule,
    LoggerModule,
  ],
})
export class AppModule {}
