import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerServiceFile } from './services/logger.service.file';
import { LoggerServiceDb } from './services/logger.service.db';
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
    LoggerServiceFile,
    LoggerServiceDb,
    LogRepository,
    {
      provide: 'ILogRepository',
      useClass: LogRepository,
    },
  ],
  exports: [LoggerServiceFile, LoggerServiceDb],
})
export class LoggerModule {}
