import { INotificationStrategy } from '../../domain/interfaces/common/notification-strategy.interface';

export class SMSNotificationStrategy implements INotificationStrategy {
  constructor(private smsClient?: any) {
    // smsClient could be Twilio client or similar
  }

  async send(recipient: string, subject: string, body: string): Promise<void> {
    console.log(`Sending SMS to ${recipient}: ${subject} - ${body}`);
    // Use smsClient to send SMS (e.g., Twilio)
    await Promise.resolve();
  }
}
