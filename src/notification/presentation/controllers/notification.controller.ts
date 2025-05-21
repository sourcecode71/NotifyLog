import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Inject,
  Get,
  Query,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiParam,
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
import * as Joi from 'joi';

class BulkNotificationDto {
  notifications: SendNotificationDto[];
}

const BulkNotificationSchema = Joi.object({
  notifications: Joi.array().items(SendNotificationSchema).min(1).required(),
});

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

    const notification = Notification.createFromDto(dto);

    // Send notification
    const strategy: INotificationStrategy =
      this.notificationFactory.createStrategy(dto.mediaType);
    await strategy.send(notification);

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

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a specific notification by ID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Notification ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Notification retrieved successfully',
    type: Notification,
  })
  @ApiResponse({
    status: 404,
    description: 'Notification not found',
  })
  async getNotificationById(@Param('id') id: string): Promise<Notification> {
    const notification = await this.notificationRepository.findById(id);
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    return notification;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a specific notification by ID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Notification ID',
  })
  @ApiResponse({
    status: 204,
    description: 'Notification deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Notification not found',
  })
  async deleteNotification(@Param('id') id: string): Promise<void> {
    const notification = await this.notificationRepository.findById(id);
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    await this.notificationRepository.deleteById(id);
    this.logger.log(`Notification with ID ${id} deleted`);
    await this.loggerDb.error({
      level: 'info',
      message: `Notification with ID ${id} deleted`,
      timestamp: new Date(),
    });
  }

  @Post('bulk')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Send notifications to multiple recipients',
  })
  @ApiBody({ type: BulkNotificationDto })
  @ApiResponse({
    status: 204,
    description: 'Bulk notifications sent successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed for one or more notifications',
  })
  async sendBulkNotifications(
    @Body(new JoiValidationPipe(BulkNotificationSchema))
    dto: BulkNotificationDto,
  ): Promise<void> {
    if (!dto.notifications || dto.notifications.length === 0) {
      throw new BadRequestException('At least one notification is required');
    }

    const promises = dto.notifications.map(async (notificationDto) => {
      const notification = new Notification(
        notificationDto.recipient,
        notificationDto.subject,
        notificationDto.body,
        notificationDto.mediaType,
        notificationDto.notificationType,
        new Date(),
      );

      const strategy: INotificationStrategy =
        this.notificationFactory.createStrategy(notificationDto.mediaType);

      await strategy.send(notification);
      await this.notificationRepository.save(notification);

      this.logger.log(
        `Bulk notification (${notificationDto.notificationType}) sent to ${notificationDto.recipient} via ${notificationDto.mediaType}`,
      );
      await this.loggerDb.error({
        level: 'info',
        message: `Bulk notification (${notificationDto.notificationType}) sent to ${notificationDto.recipient} via ${notificationDto.mediaType}`,
        timestamp: new Date(),
      });
    });

    await Promise.all(promises);
  }
}
