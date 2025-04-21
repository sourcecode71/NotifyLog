import { INotificationStrategy } from '../../domain/interfaces/common/notification-strategy.interface';

export class EmailNotificationStrategy implements INotificationStrategy {
  constructor(private emailClient?: any) {
    // emailClient could be AWS SES client or similar
  }

  async send(recipient: string, subject: string, body: string): Promise<void> {
    console.log(`Sending email to ${recipient}: ${subject} - ${body}`);
    // Use emailClient to send email (e.g., AWS SES)
    await Promise.resolve();
  }
}
