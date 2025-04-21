import * as Joi from 'joi';
import { NotificationChannel } from '../../config/notification.config';

export class NotificationValidator {
  static createNotificationSchema = Joi.object({
    recipient: Joi.string().min(1).max(100).required(),
    subject: Joi.string().min(1).max(100).required(),
    body: Joi.string().min(1).max(1000).required(),
    mediaType: Joi.string()
      .valid(...Object.values(NotificationChannel))
      .required(),
  });

  static validateCreateNotification(data: any) {
    return this.createNotificationSchema.validate(data, { abortEarly: false });
  }
}
