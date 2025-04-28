import { Notification } from '../../entities/notification.entity';

export interface IMediaValidationRepository {
  save(validation: Notification): Promise<void>;
  findUserByMedia(media: string): Promise<Notification | null>;
}
