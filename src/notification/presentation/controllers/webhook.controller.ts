import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { IWebhookRepository } from '../../domain/interfaces/webhook-repository.interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateWebhookDto } from '../dtos/webhook.dto';

@ApiTags('Webhooks')
@Controller('api/webhooks')
export class WebhookController {
  constructor(
    @Inject('IWebhookRepository')
    private readonly webhookRepository: IWebhookRepository,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a webhook subscription' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Webhook created successfully',
  })
  async createWebhook(@Body() dto: CreateWebhookDto) {
    const webhook = await this.webhookRepository.createWebhook(
      dto.url,
      dto.event,
      dto.ownerId,
    );
    return { message: 'Webhook created successfully', data: webhook };
  }

  @Get()
  @ApiOperation({ summary: 'Get webhooks for an owner' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Webhooks retrieved successfully',
  })
  async getWebhooks(@Query('ownerId') ownerId: string) {
    const webhooks = await this.webhookRepository.findByOwnerId(ownerId);
    return { data: webhooks };
  }
}
