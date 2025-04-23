import { Injectable } from '@nestjs/common';
import { Notification } from '../../domain/entities/common/notification.entity';
import { INotificationStrategy } from '../../domain/interfaces/common/notification-strategy.interface';
import { NotificationFactory } from '../../infrastructure/factories/notification.factory';
import { NotificationChannel } from '../../../config/notification.config';
import { NotificationRepository } from '../../infrastructure/repositories/notification.repository';
import { NotificationValidator } from '../validators/notification.validator';

@Injectable()
export class SendNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(
    recipient: string,
    subject: string,
    body: string,
    mediaType: NotificationChannel,
  ): Promise<void> {
    // Validate input using Joi
    const validationResult: { error?: import('joi').ValidationError } =
      NotificationValidator.validateCreateNotification({
        recipient,
        subject,
        body,
        mediaType,
      });
    // Check for validation errors
    const error = validationResult.error;
    if (error) {
      const validationError = error;
      throw new Error(
        `Validation failed: ${validationError.details.map((d) => d.message).join(', ')}`,
      );
    }

    // Create notification entity
    const notification = new Notification(
      recipient,
      subject,
      body,
      mediaType,
      new Date(),
    );

    // Send notification
    const strategy: INotificationStrategy =
      NotificationFactory.create(mediaType);
    await strategy.send(notification);

    // Save to MongoDB
    await this.notificationRepository.save(notification);
  }
}
