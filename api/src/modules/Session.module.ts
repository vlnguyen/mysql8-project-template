import { Module } from '@nestjs/common';
import { ISessionEngineProvider } from 'src/engines/UserEngine/SessionEngine/ISessionEngine';
import { SessionEngine } from 'src/engines/UserEngine/SessionEngine/SessionEngine';
import { IUserHandlerProvider } from 'src/handlers/UserHandler/IUserHandler';
import { UserHandler } from 'src/handlers/UserHandler/UserHandler';
import { ISessionManagerProvider } from 'src/managers/SessionManager/ISessionManager';
import { SessionManager } from 'src/managers/SessionManager/SessionManager';
import { SessionController } from '../controllers/session/session.controller';

@Module({
  controllers: [SessionController],
  providers: [
    { provide: ISessionManagerProvider, useClass: SessionManager },
    { provide: ISessionEngineProvider, useClass: SessionEngine },
    { provide: IUserHandlerProvider, useClass: UserHandler },
  ],
})
export class SessionModule {}
