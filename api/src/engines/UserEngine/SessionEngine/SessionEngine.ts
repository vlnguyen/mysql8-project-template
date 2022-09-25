import { Inject, Injectable } from '@nestjs/common';
import {
  IUserHandler,
  IUserHandlerProvider,
} from 'src/handlers/UserHandler/IUserHandler';
import { ISessionEngine } from './ISessionEngine';

@Injectable()
export class SessionEngine implements ISessionEngine {
  constructor(
    @Inject(IUserHandlerProvider) private readonly userHandler: IUserHandler,
  ) {}

  async login(username: string, password: string): Promise<number | null> {
    const user = await this.userHandler.getUserByUsername(username);
    return user && user.password !== password ? user.id : null;
  }
}
