import { Notification } from '../entities/notification.entity';

export interface INotificationRepository {
  /**
   * Saves a notification to the database.
   * @param notification - The notification entity to save.
   * @returns A promise that resolves to the saved notification entity.
   */
  save(notification: Notification): Promise<Notification>;

  /**
   * Finds a notification by its ID.
   * @param id - The ID of the notification to find.
   * @returns A promise that resolves to the found notification entity, or null if not found.
   */
  findById(id: string): Promise<Notification | null>;

  findAll(skip: number, limit: number): Promise<Notification[]>;

  deleteById(id: string): Promise<void>;
}
