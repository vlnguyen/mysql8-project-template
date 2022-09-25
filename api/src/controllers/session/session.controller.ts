import {
  Controller,
  Get,
  Post,
  Delete,
  Session,
  Req,
  Inject,
  Body,
} from '@nestjs/common';
import { Request } from 'express';
import {
  ISessionManager,
  ISessionManagerProvider,
} from 'src/managers/SessionManager/ISessionManager';
import { ISessionData } from '../../infrastructure/types/session.types';

@Controller('session')
export class SessionController {
  constructor(
    @Inject(ISessionManagerProvider)
    private readonly sessionManager: ISessionManager,
  ) {}

  @Post('login')
  async login(
    @Session() session: ISessionData,
    @Body('username') username?: string,
    @Body('password') password?: string,
  ): Promise<IApiResponse> {
    const userId = await this.sessionManager.login(username, password);
    session.userId = userId || undefined;
    return {
      success: !!userId,
      message: !!userId ? 'Login successful.' : 'Incorrect username/password.',
    };
  }

  @Post('logout')
  logout(@Session() session: ISessionData): IApiResponse {
    session.userId = undefined;
    return { success: true, message: '' };
  }

  @Get()
  getSession(
    @Session() session: ISessionData,
  ): IApiResponse<Omit<ISessionData, 'cookie'>> {
    const { cookie, ...data } = session;
    return {
      success: true,
      message: '',
      data,
    };
  }

  @Post('visit')
  setSessionVisits(@Session() session: ISessionData): IApiResponse {
    session.visits = session.visits ? session.visits + 1 : 1;
    return {
      success: true,
      message: '',
    };
  }

  @Delete()
  clearSession(@Req() request: Request): IApiResponse {
    let message = 'Successfully cleared session.';
    request.session.destroy((e) => (message = e.message));
    return { success: true, message };
  }
}
