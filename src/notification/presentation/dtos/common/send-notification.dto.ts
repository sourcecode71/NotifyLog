import { NotificationChannel } from '../../../../config/notification.config';

export class SendNotificationDto {
  recipient: string;
  subject: string;
  body: string;
  mediaType: NotificationChannel;
}

export interface CreateNotificationDto {
  recipient: string;
  subject: string;
  body: string;
  mediaType: string;
}
export interface CreateNotificationResponseDto {
  id: string;
  recipient: string;
  subject: string;
  body: string;
  mediaType: string;
  sentAt: Date;
}
