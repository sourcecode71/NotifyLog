import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Loads .env from root directory
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = await Promise.resolve(
          configService.get<string>('MONGO_URL'),
        );
        if (!uri) {
          throw new Error('MONGO_URL not found in configuration');
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
