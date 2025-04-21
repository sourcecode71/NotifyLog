import { NotificationChannel } from '../../../config/notification.config';

export class SendNotificationDto {
  recipient: string;
  subject: string;
  body: string;
  mediaType: NotificationChannel;
}
