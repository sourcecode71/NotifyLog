import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationController } from './presentation/controllers/notification.controller';
import { NotificationRepository } from './infrastructure/repositories/notification.repository';
import { NotificationSchema } from './infrastructure/persistence/mongoose/notification.schema';
import { NotificationFactory } from './application/factories/common/notification.factory';
import { EmailNotificationStrategy } from './application/strategies/email-notification.strategy';
import { SMSNotificationStrategy } from './application/strategies/sms-notification.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Notification', schema: NotificationSchema },
    ]),
  ],
  controllers: [NotificationController],
  providers: [
    {
      provide: 'INotificationRepository',
      useClass: NotificationRepository,
    },
    NotificationFactory,
    EmailNotificationStrategy,
    SMSNotificationStrategy,
  ],
})
export class NotificationModule {}
