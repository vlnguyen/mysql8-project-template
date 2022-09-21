import { Controller, Get } from '@nestjs/common';

@Controller('session')
export class SessionController {
  constructor() {}

  @Get()
  async getUser(): Promise<any> {
    return '/api/session';
  }
}
