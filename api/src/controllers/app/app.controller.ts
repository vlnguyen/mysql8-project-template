import { Controller, Get } from '@nestjs/common';
import { AppManager } from 'src/managers/app/AppManager';

@Controller()
export class AppController {
  constructor(private readonly appService: AppManager) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
