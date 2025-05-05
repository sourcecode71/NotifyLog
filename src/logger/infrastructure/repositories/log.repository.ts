import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ILogRepository } from '../../domain/interfaces/log-repository.interface';
import { Logger } from '../persistence/mongoose/logger.schema';
import { LogEntryDto } from '../persistence/dto/log-entry-dto';

@Injectable()
export class LogRepository implements ILogRepository {
  constructor(
    @InjectModel(Logger.name)
    private readonly loggerModel: Model<Logger>,
  ) {}

  async findLogById(_id: string): Promise<Logger | null> {
    try {
      return await this.loggerModel.findById(_id).lean().exec();
    } catch (error) {
      console.error('Error finding log by ID:', error);
      throw new Error('Failed to retrieve log');
    }
  }

  async findLogsByFilter(
    level: string,
    context: string | undefined,
    page: number,
    limit: number,
  ): Promise<{ logs: Logger[]; total: number }> {
    try {
      const filter: { level: string; context?: string } = { level };

      if (context) {
        filter.context = context;
      }

      const [logs, total] = await Promise.all([
        this.loggerModel
          .find(filter)
          .sort({ timestamp: -1 }) // Newest first
          .skip((page - 1) * limit)
          .limit(limit)
          .lean()
          .exec(),
        this.loggerModel.countDocuments(filter).exec(),
      ]);

      return { logs, total };
    } catch (error) {
      console.error('Error finding logs by filter:', error);
      throw new Error('Failed to retrieve logs');
    }
  }
  async saveLog(log: LogEntryDto): Promise<Logger> {
    try {
      const logEntry = new this.loggerModel(log);
      await logEntry.save();
      return logEntry.toObject();
    } catch (error) {
      console.error('Error saving log:', error);
      throw new Error('Failed to save log');
    }
  }
}
