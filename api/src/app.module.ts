import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { AppController } from './controllers/app/app.controller';
import { SessionController } from './controllers/session/session.controller';
import { UserController } from './controllers/user/user.controller';

import { IUserHandlerProvider } from './handlers/UserHandler/IUserHandler';
import { UserHandler } from './handlers/UserHandler/UserHandler';
import { IPostHandlerProvider } from './handlers/PostHandler/IPostHandler';
import { PostHandler } from './handlers/PostHandler/PostHandler';

import { IUserEngineProvider } from './engines/UserEngine/IUserEngine';
import { UserEngine } from './engines/UserEngine/UserEngine';

import { IAppManagerProvider } from './managers/AppManager/IAppManager';
import { AppManager } from './managers/AppManager/AppManager';
import { IUserManagerProvider } from './managers/UserManager/IUserManager';
import { UserManager } from './managers/UserManager/UserManager';

@Module({
  controllers: [AppController, SessionController, UserController],
  imports: [MikroOrmModule.forRoot()],
  providers: [
    { provide: IAppManagerProvider, useClass: AppManager },
    { provide: IUserHandlerProvider, useClass: UserHandler },
    { provide: IUserEngineProvider, useClass: UserEngine },
    { provide: IUserManagerProvider, useClass: UserManager },
    { provide: IPostHandlerProvider, useClass: PostHandler },
  ],
})
export class AppModule {}
