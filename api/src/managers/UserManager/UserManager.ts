import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from 'src/infrastructure/dto/UserDto';
import {
  IUserEngineProvider,
  IUserEngine,
} from '../../engines/UserEngine/IUserEngine';
import { IUserManager } from './IUserManager';

@Injectable()
export class UserManager implements IUserManager {
  constructor(
    @Inject(IUserEngineProvider) private readonly userEngine: IUserEngine,
  ) {}

  async getUser(id: number): Promise<UserDto | null> {
    return (await this.userEngine.getUser(id)) ?? null;
  }
}
