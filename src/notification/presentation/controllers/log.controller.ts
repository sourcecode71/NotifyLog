import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  Delete,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { LoggerServiceDb } from '../../../logger/services/logger.service.db';

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
  async getLogs(
    @Query('level') level: string,
    @Query('context') context?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const { logs, total } = await this.logService.getLogsByFilter(
      level,
      context,
      page,
      limit,
    );

    return {
      data: logs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get log by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Log retrieved successfully',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Log ID',
  })
  @ApiResponse({
    status: 404,
    description: 'Log not found',
  })
  async getLogById(@Param('id') id: string) {
    const log = await this.logService.getLogById(id);
    if (!log) {
      throw new NotFoundException(`Log with ID ${id} not found`);
    }
    return { data: log };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a specific log by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Log ID',
  })
  @ApiResponse({
    status: 204,
    description: 'Log deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Log not found',
  })
  async deleteLogById(@Param('id') id: string): Promise<void> {
    const log = await this.logService.getLogById(id);
    if (!log) {
      throw new NotFoundException(`Log with ID ${id} not found`);
    }
    await this.logService.deleteLogById(id);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete logs by filter' })
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
  @ApiResponse({
    status: 204,
    description: 'Logs deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'No logs found for the given filter',
  })
  @Get('stats')
  @ApiOperation({ summary: 'Get log statistics' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Log statistics retrieved successfully',
  })
  @ApiQuery({
    name: 'level',
    required: false,
    description: 'Filter by log level (e.g., info, error)',
  })
  @ApiQuery({
    name: 'context',
    required: false,
    description: 'Filter by context (e.g., NotificationController)',
  })
  async getLogStats(
    @Query('level') level?: string,
    @Query('context') context?: string,
  ): Promise<{ data: Record<string, string> }> {
    const stats = (await this.logService.getLogStats(level, context)) as Record<
      string,
      string
    >;
    return { data: stats };
  }
}
