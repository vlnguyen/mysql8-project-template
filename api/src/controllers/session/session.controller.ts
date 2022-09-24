import { Controller, Get, Post, Session } from '@nestjs/common';
import { ISessionData } from 'src/infrastructure/types/session.types';

@Controller('session')
export class SessionController {
  @Get()
  getSession(@Session() session: ISessionData) {
    return {
      visits: session.visits ?? null,
    };
  }

  @Post()
  setSessionVisits(@Session() session: ISessionData) {
    const { visits } = session;
    const newVisits = visits ? visits + 1 : 1;
    session.visits = newVisits;
    return { newVisits };
  }
}
