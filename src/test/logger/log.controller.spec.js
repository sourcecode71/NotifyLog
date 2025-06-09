"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const log_controller_1 = require("../../src/notification/presentation/controllers/log.controller");
const logger_service_db_1 = require("../../src/logger/services/logger.service.db");
const common_1 = require("@nestjs/common");
describe('LogController', () => {
    let controller;
    let logService;
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
        const module = await testing_1.Test.createTestingModule({
            controllers: [log_controller_1.LogController],
            providers: [
                {
                    provide: logger_service_db_1.LoggerServiceDb,
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
        controller = module.get(log_controller_1.LogController);
        logService = module.get(logger_service_db_1.LoggerServiceDb);
    });
    describe('getLogs', () => {
        it('should return logs with default pagination', async () => {
            const mockResult = {
                logs: [mockLog],
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
                .mockResolvedValue(null);
            await expect(controller.getLogById('999')).rejects.toThrow(common_1.NotFoundException);
            await expect(controller.getLogById('999')).rejects.toThrow('Log with ID 999 not found');
        });
    });
    describe('deleteLogById', () => {
        it('should delete a log by ID', async () => {
            await controller.deleteLogById('1');
        });
        it('should throw NotFoundException if log not found', async () => {
            jest
                .spyOn(logService, 'getLogById')
                .mockResolvedValue(null);
            await expect(controller.deleteLogById('999')).rejects.toThrow(common_1.NotFoundException);
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
//# sourceMappingURL=log.controller.spec.js.map