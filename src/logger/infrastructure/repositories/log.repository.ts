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
  async findLogById(_id: string): Promise<Logger | null> {
    return await this.loggerModel.findById(_id).exec();
  }
  async findLogsByFilter(
    level: string,
    context: string | undefined,
    page: number,
    limit: number,
  ): Promise<any[]> {
    const filter: { level: string; context?: string } = { level };
    if (context) {
      filter.context = context;
    }
    const logs = await this.loggerModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    return logs;
  }

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
