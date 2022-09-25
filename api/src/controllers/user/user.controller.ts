import {
  Controller,
  Get,
  Inject,
  Param,
  Session,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ISessionData } from 'src/infrastructure/types/session.types';
import {
  IUserManager,
  IUserManagerProvider,
} from '../../managers/UserManager/IUserManager';
import { IGetUserResponse } from './user.controller.types';

@Controller('user')
export class UserController {
  constructor(
    @Inject(IUserManagerProvider) private readonly userManager: IUserManager,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getUser(
    @Session() session: ISessionData,
    @Param() params: { id: string },
  ): Promise<IApiResponse<IGetUserResponse>> {
    const id = parseInt(params.id);
    const user = await this.userManager.getUser(id);
    return {
      success: !!user,
      message: '',
      data: {
        user,
        isSelf: user && user.id === session.userId,
      },
    };
  }
}
