import { Logger } from '../../infrastructure/persistence/mongoose/logger.schema';

export interface PaginatedLogs {
  logs: Logger[];
  total: number;
}
