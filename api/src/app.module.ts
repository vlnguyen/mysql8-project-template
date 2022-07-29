import { Module } from '@nestjs/common';
import { AppController } from './controllers/app/app.controller';
import { AppManager } from './managers/app/AppManager';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppManager],
})
export class AppModule {}
