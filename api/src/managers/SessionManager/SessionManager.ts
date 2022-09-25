import { Inject, Injectable } from '@nestjs/common';
import {
  ISessionEngine,
  ISessionEngineProvider,
} from 'src/engines/UserEngine/SessionEngine/ISessionEngine';
import { ISessionManager } from './ISessionManager';

@Injectable()
export class SessionManager implements ISessionManager {
  constructor(
    @Inject(ISessionEngineProvider)
    private readonly sessionEngine: ISessionEngine,
  ) {}

  async login(username: string, password: string): Promise<number | null> {
    return this.sessionEngine.login(username, password);
  }
}
