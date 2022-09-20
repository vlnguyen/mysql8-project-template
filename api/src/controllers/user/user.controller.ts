import { Controller, Get, Inject, Param } from '@nestjs/common';
import {
  GetUserResponse,
  IUserManager,
  IUserManagerProvider,
} from 'src/managers/UserManager/IUserManager';

@Controller('user')
export class UserController {
  constructor(
    @Inject(IUserManagerProvider) private readonly userManager: IUserManager,
  ) {}

  @Get(':id')
  async getUser(@Param() params): Promise<GetUserResponse> {
    const id = parseInt(params.id);
    return await this.userManager.getUser(id);
  }
}
