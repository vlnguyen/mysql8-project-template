import { Test, TestingModule } from '@nestjs/testing';
import { IAppManagerProvider } from '../../managers/AppManager/IAppManager';
import { AppManager } from '../../managers/AppManager/AppManager';
import { AppController } from '../../controllers/app/app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: IAppManagerProvider, useClass: AppManager }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
