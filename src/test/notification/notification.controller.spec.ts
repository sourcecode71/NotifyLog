import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from '../../../src/notification/presentation/controllers/notification.controller';
import { NotificationFactory } from '../../../src/notification/application/factories/notification.factory';
import { INotificationRepository } from '../../../src/notification/domain/interfaces/notification-repository.interface';
import { LoggerServiceFile } from '../../../src/logger/services/logger.service.file';
import { LoggerServiceDb } from '../../../src/logger/services/logger.service.db';
import { SendNotificationDto } from '../../../src/notification/presentation/dtos/send-notification.dto';
import { Notification } from '../../../src/notification/domain/entities/notification.entity';
import {
  NotificationChannel,
  NotificationType,
} from '../../../src/config/notification.config';

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="jest" />

describe('NotificationController', () => {
  let controller: NotificationController;
  let factory: NotificationFactory;
  let repository: INotificationRepository;

  const mockNotification = new Notification(
    'test@example.com',
    'Test Subject',
    'Test Body',
    NotificationChannel.EMAIL,
    NotificationType.ADMISSION_ID,
    new Date(),
  );

  const mockSendDto: SendNotificationDto = {
    recipient: 'test@example.com',
    subject: 'Test Subject',
    body: 'Test Body',
    mediaType: NotificationChannel.EMAIL,
    notificationType: NotificationType.ADMISSION_ID,
    createdAt: new Date(),
  };

  const mockStrategy = {
    send: jest.fn().mockResolvedValue('EMAIL'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        {
          provide: NotificationFactory,
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
          provide: LoggerServiceFile,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
          },
        },
        {
          provide: LoggerServiceDb,
          useValue: {
            log: jest.fn(),
            error: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
    factory = module.get<NotificationFactory>(NotificationFactory);
    repository = module.get<INotificationRepository>('INotificationRepository');

    // Use spies to avoid unbound method errors
    jest.spyOn(factory, 'createStrategy');
    jest.spyOn(repository, 'save');
    jest.spyOn(mockStrategy, 'send');
  });

  describe('send', () => {
    it('should send notification and log successfully', async () => {
      await controller.send(mockSendDto);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(factory.createStrategy).toHaveBeenCalledWith(
        mockSendDto.mediaType,
      );
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repository.save).toHaveBeenCalledWith(expect.any(Notification));
      expect(mockStrategy.send).toHaveBeenCalledWith(expect.any(Notification));
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

      // eslint-disable-next-line @typescript-eslint/unbound-method, @typescript-eslint/no-unsafe-call
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

      // eslint-disable-next-line @typescript-eslint/unbound-method
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
