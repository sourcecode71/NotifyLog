import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from '../../domain/entities/notification.entity';
import { INotificationRepository } from '../../domain/interfaces/notification-repository.interface'; // Ensure this file exists at the specified path
import { NotificationDocument } from '../persistence/mongoose/notification.schema';

@Injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: Model<NotificationDocument>,
  ) {}
  findById(id: string): Promise<Notification | null> {
    return this.notificationModel
      .findById(id)
      .exec()
      .then((doc) => {
        if (!doc) {
          return null;
        }
        return this.toEntity(doc);
      });
  }

  async findAll(skip: number, limit: number): Promise<Notification[]> {
    const docs = await this.notificationModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    return docs.map((doc) => this.toEntity(doc));
  }
  async save(notification: Notification): Promise<Notification> {
    const doc = new this.notificationModel(notification);
    console.log(' --- doc ----===', doc);
    const saved = await doc.save();
    return this.toEntity(saved);
  }

  async deleteById(id: string): Promise<void> {
    await this.notificationModel.findByIdAndDelete(id).exec();
  }

  private toEntity(doc: NotificationDocument): Notification {
    return new Notification(
      doc.recipient,
      doc.subject,
      doc.body,
      doc.mediaType,
      doc.notificationType,
      doc.createdAt,
    );
  }
}
