// src/domain/interfaces/log-repository.interface.ts
import { LogEntryDto } from '../../infrastructure/persistence/dto/log-entry-dto';
import { Logger } from '../../infrastructure/persistence/mongoose/logger.schema';

export interface ILogRepository {
  findLogById(_id: string): Promise<Logger | null>;
  findLogsByFilter(
    level: string,
    context: string | undefined,
    page: number,
    limit: number,
  ): Promise<{
    length: number;
    logs: Logger[];
    total: number;
  }>;
  saveLog(log: LogEntryDto): Promise<Logger>; // Fix: Return `Logger` and use camelCase param
  deleteLogById(_id: string): Promise<void>; // Fix: Use camelCase param
  getLogStats(
    level: string | undefined,
    context: string | undefined,
  ): Promise<any>; // Fix: Return `any` and use camelCase params
}
