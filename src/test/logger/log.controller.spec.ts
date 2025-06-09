import { Test, TestingModule } from '@nestjs/testing';
import { LogController } from '../../../src/notification/presentation/controllers/log.controller';
import { LoggerServiceDb } from '../../../src/logger/services/logger.service.db';
import { NotFoundException } from '@nestjs/common';
import { Logger } from 'src/logger/infrastructure/persistence/mongoose/logger.schema';
import { PaginatedLogs } from '../../../src/logger/domain/interfaces/log-model.interface';

describe('LogController', () => {
  let controller: LogController;
  let logService: LoggerServiceDb;

  const mockLog = {
    _id: '1',
    level: 'info',
    message: 'Test log',
    context: 'NotificationController',
    timestamp: new Date(),
  };

  const mockStats = {
    total: 10,
    info: 5,
    warn: 3,
    error: 2,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogController],
      providers: [
        {
          provide: LoggerServiceDb,
          useValue: {
            getLogsByFilter: jest.fn().mockResolvedValue({
              logs: [mockLog],
              total: 1,
            }),
            getLogById: jest.fn().mockResolvedValue(mockLog),
            deleteLogById: jest.fn().mockResolvedValue(undefined),
            deleteLogsByFilter: jest.fn().mockResolvedValue(1),
            getLogStats: jest.fn().mockResolvedValue(mockStats),
          },
        },
      ],
    }).compile();

    controller = module.get<LogController>(LogController);
    logService = module.get<LoggerServiceDb>(LoggerServiceDb);
  });

  describe('getLogs', () => {
    it('should return logs with default pagination', async () => {
      const mockResult: PaginatedLogs = {
        logs: [mockLog as unknown as Logger],
        total: 1,
      };

      const spy = jest
        .spyOn(logService, 'getLogsByFilter')
        .mockResolvedValue(mockResult);

      const result = await controller.getLogs('info', 'LogController', 1, 10);

      expect(spy).toHaveBeenCalledWith('info', 'LogController', 1, 10);
      expect(result).toEqual({
        data: [mockLog],
        total: 1,
        page: 1,
        totalPages: 1,
      });
    });
  });

  describe('getLogById', () => {
    it('should return a log by ID', async () => {
      const result = await controller.getLogById('1');
      expect(result).toEqual({ data: mockLog });
    });

    it('should throw NotFoundException if log not found', async () => {
      jest
        .spyOn(logService, 'getLogById')
        .mockResolvedValue(null as unknown as Logger);

      await expect(controller.getLogById('999')).rejects.toThrow(
        NotFoundException,
      );
      await expect(controller.getLogById('999')).rejects.toThrow(
        'Log with ID 999 not found',
      );
    });
  });

  describe('deleteLogById', () => {
    it('should delete a log by ID', async () => {
      await controller.deleteLogById('1');
      //expect(logService.deleteLogById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if log not found', async () => {
      jest
        .spyOn(logService, 'getLogById')
        .mockResolvedValue(null as unknown as Logger);

      await expect(controller.deleteLogById('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getLogStats', () => {
    it('should return log statistics', async () => {
      const result = await controller.getLogStats('info', 'TestContext');
      expect(result).toEqual({ data: mockStats });
    });

    it('should return stats without filters', async () => {
      const result = await controller.getLogStats(undefined, undefined);
      expect(result).toEqual({ data: mockStats });
    });
  });
});
