import { Inject } from '@nestjs/common';
import {
  IUserHandler,
  IUserHandlerProvider,
} from '../../handlers/UserHandler/IUserHandler';
import { UserDto } from '../../infrastructure/dto/UserDto';
import { IUserEngine } from './IUserEngine';

export class UserEngine implements IUserEngine {
  constructor(
    @Inject(IUserHandlerProvider) private readonly userHandler: IUserHandler,
  ) {}

  async getUser(id: number): Promise<UserDto | null> {
    return this.userHandler.getUser(id);
  }
}
