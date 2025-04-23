import { Notification } from '../../entities/common/notification.entity';

export interface INotificationStrategy {
  send(recipient: Notification): Promise<void>;
}
