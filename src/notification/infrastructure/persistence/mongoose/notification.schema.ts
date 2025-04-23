import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class NotificationDocument extends Document {
  @Prop({ required: true, minlength: 1, maxlength: 100 })
  recipient: string;

  @Prop({ required: true, minlength: 1, maxlength: 100 })
  subject: string;

  @Prop({ required: true, minlength: 1, maxlength: 1000 })
  body: string;

  @Prop({ required: true })
  mediaType: string;

  @Prop()
  sentAt?: Date;
}
export const NotificationSchema =
  SchemaFactory.createForClass(NotificationDocument);
