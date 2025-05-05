import { ApiProperty } from '@nestjs/swagger';

export class CreateWebhookDto {
  @ApiProperty({ description: 'The URL of the webhook' })
  url: string;

  @ApiProperty({ description: 'The event type for the webhook' })
  event: string;

  @ApiProperty({ description: 'The owner ID associated with the webhook' })
  ownerId: string;
}
