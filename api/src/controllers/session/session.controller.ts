import { Controller, Get, Session } from '@nestjs/common';

@Controller('session')
export class SessionController {
  constructor() {}

  @Get()
  async getRoot(): Promise<any> {
    return '/api/session';
  }

  @Get('setMe')
  setMe(@Session() session: Record<string, any>) {
    session.visits = session.visits ? session.visits + 1 : 1;
    return { message: 'Set new value for session.visits' };
  }

  @Get('getMe')
  getMe(@Session() session: Record<string, any>) {
    return session;
  }
}
