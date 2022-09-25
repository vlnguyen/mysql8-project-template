import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UserDto } from 'src/infrastructure/dto/UserDto';
import {
  IUserManager,
  IUserManagerProvider,
} from '../../managers/UserManager/IUserManager';

@Controller('user')
export class UserController {
  constructor(
    @Inject(IUserManagerProvider) private readonly userManager: IUserManager,
  ) {}

  @Get(':id')
  async getUser(
    @Param() params: { id: string },
  ): Promise<IApiResponse<UserDto | null>> {
    const id = parseInt(params.id);
    const user = await this.userManager.getUser(id);
    return {
      success: !!user,
      message: '',
      data: user,
    };
  }
}
