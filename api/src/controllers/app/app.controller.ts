import { Controller, Get, Inject } from '@nestjs/common';
import {
  IAppManager,
  IAppManagerProvider,
} from 'src/managers/AppManager/IAppManager';

@Controller()
export class AppController {
  constructor(
    @Inject(IAppManagerProvider) private readonly appManager: IAppManager,
  ) {}

  @Get()
  getHello(): string {
    return this.appManager.getHello();
  }
}
