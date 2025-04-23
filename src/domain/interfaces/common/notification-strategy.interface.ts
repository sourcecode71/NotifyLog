import { Notification } from 'src/domain/entities/common/notification.entity';

export interface INotificationStrategy {
  send(recipient: Notification): Promise<void>;
}
