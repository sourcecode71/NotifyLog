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
import { LoggerService } from '../../../logger/services/logger.service';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly notificationFactory: NotificationFactory,
    @Inject('INotificationRepository')
    private readonly notificationRepository: INotificationRepository,
    private readonly logger: LoggerService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async send(@Body() dto: SendNotificationDto): Promise<void> {
    // Validate input
    const { error } = NotificationValidator.validateCreateNotification(dto);
    if (error) {
      this.logger.error(`Validation failed: ${error.message}`);
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

    // Log successful send
    this.logger.log(
      `Notification sent to ${dto.recipient} via ${dto.mediaType}`,
    );
  }
}
