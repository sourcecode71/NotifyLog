import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ILogRepository } from '../../domain/interfaces/log-repository.interface';
import { Logger } from '../persistence/mongoose/logger.schema';

@Injectable()
export class LogRepository implements ILogRepository {
  constructor(
    @InjectModel(Logger.name)
    private readonly loggerModel: Model<Logger>,
  ) {}

  async saveLog(log: {
    level: string;
    message: string;
    trace?: string;
    metadata?: {
      recipient?: string;
      notificationType?: string;
      mediaType?: string;
      context?: string;
    };
    timestamp: Date;
  }): Promise<void> {
    const logEntry = new this.loggerModel(log);
    await logEntry.save();
  }
}
