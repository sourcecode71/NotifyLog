import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { NotificationFactory } from '../../application/factories/common/notification.factory';
import { NotificationValidator } from '../../application/validators/notification.validator';
import { SendNotificationDto } from '../dtos/common/send-notification.dto';
import { Notification } from '../../domain/entities/common/notification.entity';
import { INotificationStrategy } from '../../domain/interfaces/common/notification-strategy.interface';
import { INotificationRepository } from '../../domain/interfaces/common/notification-repository.interface';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly notificationFactory: NotificationFactory,
    @Inject('INotificationRepository')
    private readonly notificationRepository: INotificationRepository,
  ) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async send(@Body() dto: SendNotificationDto): Promise<void> {
    // Validate input
    const { error } = NotificationValidator.validateCreateNotification(dto);
    if (error) {
      throw new Error(`Validation failed: ${error.message}`);
    }

    // Create notification entity
    const notification = new Notification(
      dto.recipient,
      dto.subject,
      dto.body,
      dto.mediaType,
      new Date(),
    );

    // Send notification
    const strategy: INotificationStrategy = NotificationFactory.create(
      dto.mediaType as any,
    );
    await strategy.send(notification);

    // Save notification after successful send
    await this.notificationRepository.save(notification);
  }
}
