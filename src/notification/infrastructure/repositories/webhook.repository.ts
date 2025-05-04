import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Webhook } from '../persistence/mongoose/webhook.schema';
import { IWebhookRepository } from '../../domain/interfaces/webhook-repository.interface';

@Injectable()
export class WebhookRepository implements IWebhookRepository {
  constructor(
    @InjectModel('Webhook')
    private readonly webhookModel: Model<Webhook>,
  ) {}

  async createWebhook(
    url: string,
    event: string,
    ownerId: string,
  ): Promise<Webhook> {
    const webhook = new this.webhookModel({ url, event, ownerId });
    return webhook.save();
  }

  async findByOwnerId(ownerId: string): Promise<Webhook[]> {
    return this.webhookModel.find({ ownerId, active: true }).exec();
  }
}
