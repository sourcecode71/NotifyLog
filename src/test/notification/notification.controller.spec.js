"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const notification_controller_1 = require("../../src/notification/presentation/controllers/notification.controller");
const notification_factory_1 = require("../../src/notification/application/factories/notification.factory");
const logger_service_file_1 = require("../../src/logger/services/logger.service.file");
const logger_service_db_1 = require("../../src/logger/services/logger.service.db");
const notification_entity_1 = require("../../src/notification/domain/entities/notification.entity");
const notification_config_1 = require("../../src/config/notification.config");
describe('NotificationController', () => {
    let controller;
    let factory;
    let repository;
    const mockNotification = new notification_entity_1.Notification('test@example.com', 'Test Subject', 'Test Body', notification_config_1.NotificationChannel.EMAIL, notification_config_1.NotificationType.ADMISSION_ID, new Date());
    const mockSendDto = {
        recipient: 'test@example.com',
        subject: 'Test Subject',
        body: 'Test Body',
        mediaType: notification_config_1.NotificationChannel.EMAIL,
        notificationType: notification_config_1.NotificationType.ADMISSION_ID,
        createdAt: new Date(),
    };
    const mockStrategy = {
        send: jest.fn().mockResolvedValue('EMAIL'),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [notification_controller_1.NotificationController],
            providers: [
                {
                    provide: notification_factory_1.NotificationFactory,
                    useValue: {
                        createStrategy: jest.fn().mockReturnValue(mockStrategy),
                    },
                },
                {
                    provide: 'INotificationRepository',
                    useValue: {
                        save: jest.fn().mockResolvedValue(mockNotification),
                        findAll: jest.fn().mockResolvedValue([mockNotification]),
                        count: jest.fn().mockResolvedValue(1),
                    },
                },
                {
                    provide: logger_service_file_1.LoggerServiceFile,
                    useValue: {
                        log: jest.fn(),
                        error: jest.fn(),
                    },
                },
                {
                    provide: logger_service_db_1.LoggerServiceDb,
                    useValue: {
                        log: jest.fn(),
                        error: jest.fn().mockResolvedValue(undefined),
                    },
                },
            ],
        }).compile();
        controller = module.get(notification_controller_1.NotificationController);
        factory = module.get(notification_factory_1.NotificationFactory);
        repository = module.get('INotificationRepository');
        jest.spyOn(factory, 'createStrategy');
        jest.spyOn(repository, 'save');
        jest.spyOn(mockStrategy, 'send');
    });
    describe('send', () => {
        it('should send notification and log successfully', async () => {
            await controller.send(mockSendDto);
            expect(factory.createStrategy).toHaveBeenCalledWith(mockSendDto.mediaType);
            expect(repository.save).toHaveBeenCalledWith(expect.any(notification_entity_1.Notification));
            expect(mockStrategy.send).toHaveBeenCalledWith(expect.any(notification_entity_1.Notification));
        });
        it('should throw error if strategy send fails', async () => {
            jest.spyOn(factory, 'createStrategy').mockReturnValue({
                send: jest.fn().mockRejectedValue(new Error('Send failed')),
            });
            await expect(controller.send(mockSendDto)).rejects.toThrow('Send failed');
        });
    });
    describe('getNotificationHistory', () => {
        it('should return notification history with default pagination', async () => {
            jest.spyOn(repository, 'findAll');
            const result = await controller.getNotificationHistory(1, 10);
            expect(repository.findAll).toHaveBeenCalledWith(0, 10);
            expect(result).toEqual({
                data: [mockNotification],
                total: 1,
                page: 1,
                totalPages: 1,
            });
        });
        it('should handle custom pagination', async () => {
            jest
                .spyOn(repository, 'findAll')
                .mockResolvedValue([mockNotification, mockNotification]);
            const result = await controller.getNotificationHistory(2, 5);
            expect(repository.findAll).toHaveBeenCalledWith(5, 5);
            expect(result).toEqual({
                data: [mockNotification, mockNotification],
                total: 2,
                page: 2,
                totalPages: 1,
            });
        });
    });
});
//# sourceMappingURL=notification.controller.spec.js.map