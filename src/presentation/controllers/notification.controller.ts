import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { SendNotificationUseCase } from '../../application/use-cases/send-notification.use-case';
import { SendNotificationDto } from '../dtos/common/send-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async send(@Body() dto: SendNotificationDto): Promise<void> {
    await this.sendNotificationUseCase.execute(
      dto.recipient,
      dto.subject,
      dto.body,
      dto.mediaType,
    );
  }
}
