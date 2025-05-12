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
  findLogsByFilter(
    _level: string,
    _context: string | undefined,
    _page: number,
    _limit: number,
  ): Promise<{ length: number; logs: Logger[]; total: number }> {
    const filter: { [key: string]: string } = {};
    if (_level) {
      filter.level = _level;
    }
    if (_context) {
      filter.context = _context;
    }
    const skip = (_page - 1) * _limit;
    return this.loggerModel
      .find(filter)
      .skip(skip)
      .limit(_limit)
      .lean()
      .exec()
      .then(async (logs) => {
        const total = await this.loggerModel.countDocuments(filter);
        return {
          length: logs.length,
          logs,
          total,
        };
      })
      .catch((error) => {
        console.error('Error finding logs by filter:', error);
        throw new Error('Failed to retrieve logs');
      });
  }
  async deleteLogById(_id: string): Promise<void> {
    try {
      await this.loggerModel.findByIdAndDelete(_id).exec();
    } catch (error) {
      console.error('Error deleting log by ID:', error);
      throw new Error('Failed to delete log');
    }
  }
  getLogStats(
    _level: string | undefined,
    _context: string | undefined,
  ): Promise<any> {
    const filter: { [key: string]: string } = {};
    if (_level) {
      filter.level = _level;
    }
    if (_context) {
      filter.context = _context;
    }
    return this.loggerModel
      .aggregate([
        { $match: filter },
        {
          $group: {
            _id: {
              level: '$_level',
              context: '$_context',
            },
            count: { $sum: 1 },
          },
        },
      ])
      .exec()
      .catch((error) => {
        console.error('Error getting log stats:', error);
        throw new Error('Failed to retrieve log stats');
      });
  }
}
