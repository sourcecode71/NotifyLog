import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Inject,
  Get,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { NotificationFactory } from '../../application/factories/notification.factory';
import {
  SendNotificationDto,
  SendNotificationSchema,
} from '../dtos/send-notification.dto';
import { Notification } from '../../domain/entities/notification.entity';
import { INotificationStrategy } from '../../domain/interfaces/notification-strategy.interface';
import { INotificationRepository } from '../../domain/interfaces/notification-repository.interface';
import { LoggerServiceFile } from '../../../logger/services/logger.service.file';
import { LoggerServiceDb } from '../../../logger/services/logger.service.db';
import { JoiValidationPipe } from '../../../config/validation/joi-validation.pipe';

@ApiTags('Notifications')
@Controller('api/notifications')
export class NotificationController {
  constructor(
    private readonly notificationFactory: NotificationFactory,
    @Inject('INotificationRepository')
    private readonly notificationRepository: INotificationRepository,
    private readonly logger: LoggerServiceFile,
    private readonly loggerDb: LoggerServiceDb,
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
  async send(
    @Body(new JoiValidationPipe(SendNotificationSchema))
    dto: SendNotificationDto,
  ): Promise<void> {
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
    await strategy.send(notification);

    console.log('notification strategy creation ended');

    // Save notification after successful send
    await this.notificationRepository.save(notification);

    // Log successful send
    this.logger.log(
      `Notification (${dto.notificationType}) sent to ${dto.recipient} via ${dto.mediaType}`,
    );

    await this.loggerDb.error({
      level: 'info',
      message: `Notification (${dto.notificationType}) sent to ${dto.recipient} via ${dto.mediaType}`,
      timestamp: new Date(),
    });
  }

  @Get('history')
  @ApiOperation({
    summary: 'Retrieve notification history',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Notification history retrieved',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 10)',
  })
  async getNotificationHistory(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const skip = (page - 1) * limit;
    const notifications: Notification[] =
      await this.notificationRepository.findAll(skip, limit);
    const total = notifications.length;
    return {
      data: notifications,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
