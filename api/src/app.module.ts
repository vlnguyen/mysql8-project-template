import { Module } from '@nestjs/common';
import { AppController } from './controllers/app/app.controller';
import { UserController } from './controllers/user/user.controller';
import { IUserHandlerProvider } from './handlers/UserHandler/IUserHandler';
import { UserHandler } from './handlers/UserHandler/UserHandler';
import { dataSourceProvider } from './infrastructure/typeorm/database.providers';
import { AppManager } from './managers/AppManager/AppManager';
import { IAppManagerProvider } from './managers/AppManager/IAppManager';
import { IUserManagerProvider } from './managers/UserManager/IUserManager';
import { UserManager } from './managers/UserManager/UserManager';
import { IUserEngineProvider } from './engines/UserEngine/IUserEngine';
import { UserEngine } from './engines/UserEngine/UserEngine';

@Module({
  controllers: [AppController, UserController],
  imports: [],
  exports: [dataSourceProvider],
  providers: [
    dataSourceProvider,
    { provide: IAppManagerProvider, useClass: AppManager },
    { provide: IUserHandlerProvider, useClass: UserHandler },
    { provide: IUserEngineProvider, useClass: UserEngine },
    { provide: IUserManagerProvider, useClass: UserManager },
  ],
})
export class AppModule {}
