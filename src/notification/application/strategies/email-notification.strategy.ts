import { INotificationStrategy } from '../../domain/interfaces/notification-strategy.interface';
import { Notification } from '../../domain/entities/notification.entity';

export class EmailNotificationStrategy implements INotificationStrategy {
  constructor(private emailClient?: any) {
    // emailClient could be AWS SES client or similar
  }

  async send(recipient: Notification): Promise<void> {
    console.log(
      `Sending email to ${recipient.body}: ${recipient.subject} - ${recipient.body}`,
    );
    // Use emailClient to send email (e.g., AWS SES)
    await Promise.resolve();
  }
}
