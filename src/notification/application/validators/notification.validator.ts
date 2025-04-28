import * as Joi from 'joi';
import { NotificationChannel } from '../../../config/notification.config';
import {
  SendNotificationDto,
  NotificationType,
} from '../../presentation/dtos/send-notification.dto';

export class NotificationValidator {
  static createNotificationSchema = Joi.object<SendNotificationDto>({
    recipient: Joi.string().min(1).max(100).required(),
    subject: Joi.string().min(1).max(100).required(),
    body: Joi.string().min(1).max(1000).required(),
    mediaType: Joi.string()
      .valid(...Object.values(NotificationChannel))
      .required(),
    notificationType: Joi.string()
      .valid(...Object.values(NotificationType))
      .required(),
  });

  static validateCreateNotification(data: SendNotificationDto) {
    return this.createNotificationSchema.validate(data, { abortEarly: false });
  }
}
