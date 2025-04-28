import { Notification } from '../entities/notification.entity';

export interface INotificationStrategy {
  send(recipient: Notification): Promise<void>;
}
