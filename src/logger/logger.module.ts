import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerService } from './services/logger.service';
import { LogRepository } from './infrastructure/repositories/log.repository';
import {
  Logger,
  LoggerSchema,
} from './infrastructure/persistence/mongoose/logger.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Logger.name, schema: LoggerSchema }]),
  ],
  providers: [
    LoggerService,
    LogRepository,
    {
      provide: 'ILogRepository',
      useClass: LogRepository,
    },
  ],
  exports: [LoggerService, 'ILogRepository', LogRepository],
})
export class LoggerModule {}
