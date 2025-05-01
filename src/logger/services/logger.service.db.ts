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
}
