import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Webhook extends Document {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  event: string; // e.g., 'notification.sent', 'notification.failed'

  @Prop({ required: true })
  ownerId: string; // e.g., user or system ID

  @Prop({ default: true })
  active: boolean;
}

export const WebhookSchema = SchemaFactory.createForClass(Webhook);
