import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'logger', timestamps: true })
export class Logger extends Document {
  @Prop({ required: true, enum: ['info', 'error'] })
  level: string;

  @Prop({ required: true })
  message: string;

  @Prop()
  trace?: string;

  @Prop({ type: Object })
  metadata?: {
    recipient?: string;
    notificationType?: string;
    mediaType?: string;
    context?: string;
  };

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const LoggerSchema = SchemaFactory.createForClass(Logger);
