import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SessionModule } from './modules/SessionModule';
import { UserModule } from './modules/UserModule';
import { AppModule } from './modules/AppModule';
import { PostModule } from './modules/PostModule';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    SessionModule,
    UserModule,
    AppModule,
    PostModule,
  ],
})
export class ApiModule {}
