import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as Joi from 'joi';
import { NotificationChannel } from '../../../../config/notification.config';
import { NotificationType } from '../../../../config/notification.config';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true })
  recipient: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true, enum: NotificationChannel })
  mediaType: NotificationChannel;

  @Prop({ required: true, enum: NotificationType })
  notificationType: NotificationType;

  @Prop({ default: Date.now })
  sentAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

const NotificationJoiSchema = Joi.object({
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
  sentAt: Joi.date().default(Date.now),
}).custom(
  (value: { recipient: string; mediaType: NotificationChannel }, helpers) => {
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
  },
);

NotificationSchema.pre('save', function (next) {
  const { error } = NotificationJoiSchema.validate(this.toObject(), {
    abortEarly: false,
  });
  if (error) {
    return next(
      new Error(
        'Validation failed: ' + error.details.map((d) => d.message).join(', '),
      ),
    );
  }
  next();
});
