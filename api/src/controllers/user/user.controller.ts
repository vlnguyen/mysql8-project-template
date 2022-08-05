import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UserDto } from 'src/infrastructure/dto/UserDto';
import {
  IUserManager,
  IUserManagerProvider,
} from 'src/managers/UserManager/IUserManager';

@Controller('user')
export class UserController {
  constructor(
    @Inject(IUserManagerProvider) private readonly userManager: IUserManager,
  ) {}

  @Get(':id')
  async getUser(@Param() params): Promise<{ user: UserDto | null }> {
    const id = parseInt(params.id);
    return {
      user: (await this.userManager.getUser(id)) ?? null,
    };
  }
}
