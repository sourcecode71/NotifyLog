import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from '../../domain/entities/common/notification.entity';
import { INotificationRepository } from '../../domain/interfaces/common/notification-repository.interface'; // Ensure this file exists at the specified path
import { NotificationDocument } from '../persistence/mongoose/notification.schema';

@Injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: Model<NotificationDocument>,
  ) {}
  findById(id: string): Promise<Notification | null> {
    throw new Error(`Method not implemented. ID: ${id}`);
  }

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
