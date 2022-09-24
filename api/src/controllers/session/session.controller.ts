import { Controller, Get, Post, Session, Req } from '@nestjs/common';
import { Request } from 'express';
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

  @Post('clear')
  clearSession(@Req() request: Request) {
    let message = 'Successfuly cleared session.';
    request.session.destroy((e) => (message = e.message));
    return { message };
  }
}
