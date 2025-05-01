export interface ILogRepository {
  findLogById(_id: string): any;
  findLogsByFilter(
    level: string,
    context: string | undefined,
    page: number,
    limit: number,
  ): Promise<any[]>;
  saveLog(log: {
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
  }): Promise<void>;
}
