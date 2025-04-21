import { MediaValidation } from '../../entities/common/media-validation.entity';

export interface IMediaValidationRepository {
  save(validation: MediaValidation): Promise<void>;
  findUserByMedia(media: string): Promise<MediaValidation | null>;
}
