import * as Joi from 'joi';
import { NotificationChannel } from '../../../config/notification.config';
import { SendNotificationDto } from '../../presentation/dtos/common/send-notification.dto';

export class NotificationValidator {
  // Define schema with Joi, no need for explicit casts
  static createNotificationSchema = Joi.object({
    recipient: Joi.string().min(1).max(100).required(),
    subject: Joi.string().min(1).max(100).required(),
    body: Joi.string().min(1).max(1000).required(),
    mediaType: Joi.string()
      .valid(...Object.values(NotificationChannel))
      .required(),
  });

  // Validate with typed input and return Joi result
  static validateCreateNotification(data: SendNotificationDto) {
    return this.createNotificationSchema.validate(data, { abortEarly: false });
  }
}
