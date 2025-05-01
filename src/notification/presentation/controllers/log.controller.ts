import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { LoggerServiceDb } from '../../../logger/services/logger.service.db';
import { ApiOperation, ApiResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Logs')
@Controller('api/logs')
export class LogController {
  constructor(private readonly logService: LoggerServiceDb) {}

  @Get()
  @ApiOperation({ summary: 'Get logs by filter' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logs retrieved successfully',
  })
  @ApiQuery({
    name: 'level',
    required: true,
    description: 'Log level (e.g., info, error)',
  })
  @ApiQuery({
    name: 'context',
    required: false,
    description: 'Context (e.g., NotificationController)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 10)',
  })
  getLogs(
    @Query('level') level: string,
    @Query('context') context?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const logs = this.logService.getLogsByFilter(level, context, page, limit);
    return logs;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get log by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Log retrieved successfully',
  })
  async getLogById(@Param('id') id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const log = await this.logService.getLogById(id);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { data: log };
  }
}
