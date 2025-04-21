import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from '../../domain/entities/common/notification.entity';
import { NotificationDocument } from '../persistence/mongoose/notification.schema';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: Model<NotificationDocument>,
  ) {}

  async save(notification: Notification): Promise<Notification> {
    const doc = new this.notificationModel(notification);
    const saved = await doc.save();
    return this.toEntity(saved);
  }

  private toEntity(doc: NotificationDocument): Notification {
    return new Notification(
      doc.recipient,
      doc.subject,
      doc.body,
      doc.mediaType,
      doc.sentAt,
      (doc._id as string).toString(),
    );
  }
}
