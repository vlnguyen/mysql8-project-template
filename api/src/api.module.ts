import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SessionModule } from './modules/Session.module';
import { UserModule } from './modules/User.module';
import { AppModule } from './modules/App.module';
import { PostModule } from './modules/Post.module';

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
