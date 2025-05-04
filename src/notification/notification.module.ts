import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationController } from './presentation/controllers/notification.controller';
import { WebhookController } from './presentation/controllers/webhook.controller';
import { LogController } from './presentation/controllers/log.controller';
import { NotificationRepository } from './infrastructure/repositories/notification.repository';
import { WebhookRepository } from './infrastructure/repositories/webhook.repository';
import { NotificationSchema } from './infrastructure/persistence/mongoose/notification.schema';
import { WebhookSchema } from './infrastructure/persistence/mongoose/webhook.schema';
import { NotificationFactory } from './application/factories/notification.factory';
import { EmailNotificationStrategy } from './application/strategies/email-notification.strategy';
import { SMSNotificationStrategy } from './application/strategies/sms-notification.strategy';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Notification', schema: NotificationSchema },
      { name: 'Webhook', schema: WebhookSchema }, // Register Webhook schema
    ]),
    LoggerModule,
  ],
  controllers: [NotificationController, WebhookController, LogController],
  providers: [
    {
      provide: 'INotificationRepository',
      useClass: NotificationRepository,
    },
    {
      provide: 'IWebhookRepository',
      useClass: WebhookRepository,
    },
    NotificationFactory,
    EmailNotificationStrategy,
    SMSNotificationStrategy,
  ],
})
export class NotificationModule {}
