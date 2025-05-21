import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as Joi from 'joi';
import {
  NotificationChannel,
  NotificationType,
} from '../../../../config/notification.config';

export type NotificationDocument = NotificationSchemaClass & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: false }, // Only createdAt
  collection: 'notifications', // Explicit collection name
  versionKey: false, // Disable version key (_v)
})
export class NotificationSchemaClass {
  @Prop({
    required: true,
    validate: {
      validator: function (this: NotificationSchemaClass, v: string) {
        if (this.mediaType === NotificationChannel.EMAIL) {
          return Joi.string().email().validate(v).error === undefined;
        }
        if (this.mediaType === NotificationChannel.SMS) {
          return (
            Joi.string()
              .pattern(/^\+?[1-9]\d{1,14}$/)
              .validate(v).error === undefined
          );
        }
        return true;
      },
      message: 'Recipient must match mediaType format',
    },
  })
  recipient: string;

  @Prop({ required: true, minlength: 3, maxlength: 100 })
  subject: string;

  @Prop({ required: true, minlength: 10, maxlength: 1000 })
  body: string;

  @Prop({
    required: true,
    enum: Object.values(NotificationChannel),
    type: String,
  })
  mediaType: NotificationChannel;

  @Prop({
    required: true,
    enum: Object.values(NotificationType),
    type: String,
  })
  notificationType: NotificationType;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(
  NotificationSchemaClass,
);
