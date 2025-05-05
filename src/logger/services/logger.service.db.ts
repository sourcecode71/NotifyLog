import { Injectable, Inject } from '@nestjs/common';
import { ILogRepository } from '../domain/interfaces/log-repository.interface';

@Injectable()
export class LoggerServiceDb {
  constructor(
    @Inject('ILogRepository') private readonly logRepository: ILogRepository,
  ) {}

  async error(
    message: string,
    trace?: string,
    metadata?: {
      recipient?: string;
      notificationType?: string;
      mediaType?: string;
      context?: string;
    },
  ) {
    await this.logRepository.saveLog({
      level: 'error',
      message,
      trace,
      metadata,
      timestamp: new Date(),
    });
  }
  async getLogsByFilter(
    level: string,
    context: string | undefined,
    page: number,
    limit: number,
  ) {
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return logs;
  }
  async getLogById(id: string) {
    const log = await this.logRepository.findLogById(id);
    if (!log) {
      throw new Error(`Log with ID: ${id} not found`);
    }
    return log;
  }
}
