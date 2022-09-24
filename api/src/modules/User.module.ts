import { Module } from '@nestjs/common';
import { IUserHandlerProvider } from '../handlers/UserHandler/IUserHandler';
import { UserHandler } from '../handlers/UserHandler/UserHandler';
import { IUserEngineProvider } from '../engines/UserEngine/IUserEngine';
import { UserEngine } from '../engines/UserEngine/UserEngine';
import { IUserManagerProvider } from '../managers/UserManager/IUserManager';
import { UserManager } from '../managers/UserManager/UserManager';
import { UserController } from '../controllers/user/user.controller';

@Module({
  controllers: [UserController],
  providers: [
    { provide: IUserHandlerProvider, useClass: UserHandler },
    { provide: IUserEngineProvider, useClass: UserEngine },
    { provide: IUserManagerProvider, useClass: UserManager },
  ],
})
export class UserModule {}
