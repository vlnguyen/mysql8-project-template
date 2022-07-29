import { Injectable } from '@nestjs/common';
import { IAppManager } from './IAppManager';

@Injectable()
export class AppManager implements IAppManager {
  getHello(): string {
    return 'Hello World!';
  }
}
