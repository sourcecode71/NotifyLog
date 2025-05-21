import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { NotificationChannel } from '../../../config/notification.config';
import { NotificationType } from '../../../config/notification.config';

export class SendNotificationDto {
  @ApiProperty({
    description: 'Recipient email or phone number',
    example: 'test@example.com',
  })
  recipient: string;

  @ApiProperty({
    description: 'Subject of the notification',
    example: 'Your Admission User ID',
  })
  subject: string;

  @ApiProperty({
    description: 'Body of the notification',
    example: 'Your user ID for admission is USER123. Please use it to proceed.',
  })
  body: string;

  @ApiProperty({
    description: 'Type of notification channel',
    example: NotificationChannel.EMAIL,
    enum: NotificationChannel,
  })
  mediaType: NotificationChannel;

  @ApiProperty({
    description: 'Type of notification',
    example: NotificationType.ADMISSION_ID,
    enum: NotificationType,
  })
  notificationType: NotificationType;
  createdAt: Date;
}

export const SendNotificationSchema = Joi.object({
  recipient: Joi.string().required().messages({
    'string.empty': 'Recipient is required',
  }),
  subject: Joi.string().min(3).max(100).required().messages({
    'string.min': 'Subject must be at least 3 characters',
    'string.max': 'Subject must not exceed 100 characters',
    'string.empty': 'Subject is required',
  }),
  body: Joi.string().min(10).max(1000).required().messages({
    'string.min': 'Body must be at least 10 characters',
    'string.max': 'Body must not exceed 1000 characters',
    'string.empty': 'Body is required',
  }),
  mediaType: Joi.string()
    .valid(...Object.values(NotificationChannel))
    .required()
    .messages({
      'any.only': 'Invalid mediaType, must be one of: EMAIL, SMS',
      'string.empty': 'mediaType is required',
    }),
  notificationType: Joi.string()
    .valid(...Object.values(NotificationType))
    .required()
    .messages({
      'any.only': 'Invalid notificationType',
      'string.empty': 'notificationType is required',
    }),
}).custom((value: Record<string, any>, helpers) => {
  if (
    value.mediaType === NotificationChannel.EMAIL &&
    !Joi.string().email().validate(value.recipient).value
  ) {
    return helpers.message({
      custom: 'Recipient must be a valid email for EMAIL channel',
    });
  }
  if (
    value.mediaType === NotificationChannel.SMS &&
    !Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .validate(value.recipient).value
  ) {
    return helpers.message({
      custom: 'Recipient must be a valid phone number for SMS channel',
    });
  }
  return value;
});
