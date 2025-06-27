import { Test, TestingModule } from '@nestjs/testing';
import { NotificationDispatcherService } from './notification-dispatcher.service';

describe('NotificationDispatcherService', () => {
  let service: NotificationDispatcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationDispatcherService],
    }).compile();

    service = module.get<NotificationDispatcherService>(NotificationDispatcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
