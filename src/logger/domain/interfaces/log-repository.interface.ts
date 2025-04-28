export interface ILogRepository {
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
