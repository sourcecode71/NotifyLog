import { Injectable, Inject } from '@nestjs/common';
import { ILogRepository } from '../domain/interfaces/log-repository.interface';
import { LogEntryDto } from '../infrastructure/persistence/dto/log-entry-dto';
import { PaginatedLogs } from '../domain/interfaces/log-model.interface';

@Injectable()
export class LoggerServiceDb {
  constructor(
    @Inject('ILogRepository') private readonly logRepository: ILogRepository,
  ) {}

  async error(logEntryDto: LogEntryDto) {
    await this.logRepository.saveLog(logEntryDto);
  }
  async getLogsByFilter(
    level: string,
    context: string | undefined,
    page: number,
    limit: number,
  ): Promise<PaginatedLogs> {
    const logs = await this.logRepository.findLogsByFilter(
      level,
      context,
      page,
      limit,
    );
    if (!logs || logs.logs.length === 0) {
      throw new Error(
        `No logs found. Level: ${level}, Context: ${context}, Page: ${page}, Limit: ${limit}`,
      );
    }
    return logs;
  }
  async getLogById(id: string) {
    const log = await this.logRepository.findLogById(id);
    if (!log) {
      throw new Error(`Log with ID: ${id} not found`);
    }
    return log;
  }

  async deleteLogById(id: string) {
    const log = await this.logRepository.findLogById(id);
    if (!log) {
      throw new Error(`Log with ID: ${id} not found`);
    }
    await this.logRepository.deleteLogById(id);
  }

  async getLogStats(
    level: string | undefined,
    context: string | undefined,
  ): Promise<any> {
    return await this.logRepository.getLogStats(level, context);
  }
}
