import { Module } from '@nestjs/common';
import { AppController } from './controllers/app/app.controller';
import { AppManager } from './managers/AppManager/AppManager';
import { IAppManagerProvider } from './managers/AppManager/IAppManager';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [{ provide: IAppManagerProvider, useClass: AppManager }],
})
export class AppModule {}
