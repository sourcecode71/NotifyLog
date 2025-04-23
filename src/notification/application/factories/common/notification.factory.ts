import { INotificationStrategy } from '../../../domain/interfaces/common/notification-strategy.interface';
import { EmailNotificationStrategy } from '../../strategies/email-notification.strategy';
import { SMSNotificationStrategy } from '../../strategies/sms-notification.strategy';
import { UnsupportedMediaTypeError } from '../../../domain/errors/unsupported-media-type.error';
import { Injectable } from '@nestjs/common';
import { NotificationChannel } from 'src/config/notification.config';

@Injectable()
export class NotificationFactory {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static create(_arg0: any): INotificationStrategy {
    throw new Error('Method not implemented.');
  }
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
