import { SendNotificationDto } from '../../presentation/dtos/send-notification.dto';
import { NotificationType } from '../../../config/notification.config';

export class Notification {
  constructor(
    public recipient: string,
    public subject: string,
    public body: string,
    public mediaType: string,
    public notificationType: NotificationType,
    public createdAt: Date,
  ) {}

  static createFromDto(dto: SendNotificationDto): Notification {
    return new Notification(
      dto.recipient,
      dto.subject,
      dto.body,
      dto.mediaType,
      this.validateNotificationType(dto.notificationType),
      dto.createdAt || new Date(),
    );
  }

  private static validateNotificationType(type: string): NotificationType {
    if (!Object.values(NotificationType).includes(type as NotificationType)) {
      throw new Error(`Invalid notification type: ${type}`);
    }
    console.log('after type casting ---', type);
    return type as NotificationType;
  }
}
