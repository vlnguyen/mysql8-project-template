import { Inject, Injectable } from '@nestjs/common';
import {
  IUserEngineProvider,
  IUserEngine,
} from '../../engines/UserEngine/IUserEngine';
import { GetUserResponse, IUserManager } from './IUserManager';

@Injectable()
export class UserManager implements IUserManager {
  constructor(
    @Inject(IUserEngineProvider) private readonly userEngine: IUserEngine,
  ) {}

  async getUser(id: number): Promise<GetUserResponse> {
    return {
      user: (await this.userEngine.getUser(id)) ?? null,
    };
  }
}
