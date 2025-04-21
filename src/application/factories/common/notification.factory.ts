import { INotificationStrategy } from '../../../domain/interfaces/common/notification-strategy.interface';
import { EmailNotificationStrategy } from '../../strategies/email-notification.strategy';
import { SMSNotificationStrategy } from '../../strategies/sms-notification.strategy';
import { UnsupportedMediaTypeError } from '../../../domain/errors/unsupported-media-type.error';
import { Injectable } from '@nestjs/common';

export enum NotificationMediaType {
  EMAIL = 'email',
  PHONE = 'phone',
}

@Injectable()
export class NotificationFactory {
  static create(mediaType: NotificationMediaType): INotificationStrategy {
    switch (mediaType) {
      case NotificationMediaType.EMAIL:
        return new EmailNotificationStrategy();
      case NotificationMediaType.PHONE:
        return new SMSNotificationStrategy();
      default:
        throw new UnsupportedMediaTypeError(mediaType);
    }
  }
}
