import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { NotificationFactory } from '../../application/factories/notification.factory';
import { NotificationValidator } from '../../application/validators/notification.validator';
import { SendNotificationDto } from '../dtos/send-notification.dto';
import { Notification } from '../../domain/entities/notification.entity';
import { INotificationStrategy } from '../../domain/interfaces/notification-strategy.interface';
import { INotificationRepository } from '../../domain/interfaces/notification-repository.interface';
import { LoggerService } from '../../../logger/services/logger.service';

@ApiTags('Notifications')
@Controller('api/notifications')
export class NotificationController {
  constructor(
    private readonly notificationFactory: NotificationFactory,
    @Inject('INotificationRepository')
    private readonly notificationRepository: INotificationRepository,
    private readonly logger: LoggerService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary:
      'Send a notification for educational use cases (admission, registration, etc.)',
  })
  @ApiBody({ type: SendNotificationDto })
  @ApiResponse({
    status: 204,
    description: 'Notification sent successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed',
  })
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

    console.log('notification strategy creation started');
    // Send notification
    const strategy: INotificationStrategy =
      this.notificationFactory.createStrategy(dto.mediaType);
    console.log('notification strategy is created');
    await strategy.send(notification);

    // Save notification after successful send
    await this.notificationRepository.save(notification);

    // Log successful send
    this.logger.log(
      `Notification (${dto.notificationType}) sent to ${dto.recipient} via ${dto.mediaType}`,
    );
  }
}
