import { INotificationStrategy } from '../../domain/interfaces/notification-strategy.interface';
import { Notification } from '../../domain/entities/notification.entity';

export class SMSNotificationStrategy implements INotificationStrategy {
  constructor(private smsClient?: any) {
    // smsClient could be Twilio client or similar
  }

  async send(recipient: Notification): Promise<void> {
    console.log(
      `Sending SMS to ${recipient.recipient}: ${recipient.subject} - ${recipient.body}`,
    );
    // Use smsClient to send SMS (e.g., Twilio)
    await Promise.resolve();
  }
}
