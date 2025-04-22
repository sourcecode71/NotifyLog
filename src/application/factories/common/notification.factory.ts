import { INotificationStrategy } from '../../../domain/interfaces/common/notification-strategy.interface';
import { EmailNotificationStrategy } from '../../strategies/email-notification.strategy';
import { SMSNotificationStrategy } from '../../strategies/sms-notification.strategy';
import { UnsupportedMediaTypeError } from '../../../domain/errors/unsupported-media-type.error';
import { Injectable } from '@nestjs/common';
import { NotificationChannel } from 'src/config/notification.config';

@Injectable()
export class NotificationFactory {
  constructor(
    private readonly emailStrategy: EmailNotificationStrategy,
    private readonly smsStrategy: SMSNotificationStrategy,
  ) {}

  createStrategy(mediaType: NotificationChannel): INotificationStrategy {
    switch (mediaType) {
      case NotificationChannel.EMAIL:
        return this.emailStrategy;
      case NotificationChannel.SMS:
        return this.smsStrategy;
      default:
        throw new UnsupportedMediaTypeError(mediaType);
    }
  }
}
