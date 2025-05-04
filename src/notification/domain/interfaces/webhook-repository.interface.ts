import { Webhook } from '../../infrastructure/persistence/mongoose/webhook.schema';

export interface IWebhookRepository {
  createWebhook(url: string, event: string, ownerId: string): Promise<Webhook>;
  findByOwnerId(ownerId: string): Promise<Webhook[]>;
}
