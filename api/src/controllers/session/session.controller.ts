import { Controller, Get, Session } from '@nestjs/common';
import { ISessionData } from 'src/infrastructure/types/session.types';

@Controller('session')
export class SessionController {
  constructor() {}

  @Get()
  async getRoot(): Promise<any> {
    return '/api/session';
  }

  @Get('setMe')
  setMe(@Session() session: ISessionData) {
    const { visits } = session;
    const newVisits = visits ? visits + 1 : 1;
    session.visits = newVisits;
    return { newVisits };
  }

  @Get('getMe')
  getMe(@Session() session: ISessionData) {
    return {
      visits: session.visits ?? null,
    };
  }
}
