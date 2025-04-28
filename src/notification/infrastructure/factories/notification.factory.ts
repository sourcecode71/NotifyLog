import { UnsupportedMediaTypeError } from '../../domain/errors/unsupported-media-type.error';
import { EmailNotificationStrategy } from '../../application/strategies/email-notification.strategy';
import { SMSNotificationStrategy } from '../../application/strategies/sms-notification.strategy';
import { INotificationStrategy } from '../../domain/interfaces/notification-strategy.interface';
import { NotificationChannel } from '../../../config/notification.config';

// Define a type for strategy constructors
type StrategyConstructor = new () => INotificationStrategy;

// Registry to map media types to strategy constructors
const strategyRegistry: Map<NotificationChannel, StrategyConstructor> = new Map(
  [
    [NotificationChannel.EMAIL, EmailNotificationStrategy],
    [NotificationChannel.SMS, SMSNotificationStrategy],
  ],
);

export class NotificationFactory {
  /**
   * Creates a notification strategy based on the provided media type.
   * @param mediaType - The type of notification medium (e.g., email, phone).
   * @returns An instance of the corresponding notification strategy.
   * @throws UnsupportedMediaTypeError if the media type is not supported.
   */
  static create(mediaType: NotificationChannel): INotificationStrategy {
    const StrategyClass = strategyRegistry.get(mediaType);
    if (!StrategyClass) {
      throw new UnsupportedMediaTypeError(mediaType);
    }
    return new StrategyClass();
  }

  /**
   * Registers a new notification strategy for a given media type.
   * @param mediaType - The media type to register.
   * @param strategy - The strategy constructor to associate with the media type.
   */
  static registerStrategy(
    mediaType: NotificationChannel,
    strategy: StrategyConstructor,
  ): void {
    strategyRegistry.set(mediaType, strategy);
  }
}
