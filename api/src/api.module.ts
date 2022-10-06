import { join } from 'path';
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SessionModule } from './modules/Session.module';
import { UserModule } from './modules/User.module';
import { AppModule } from './modules/App.module';
import { PostModule } from './modules/Post.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    }),
    MikroOrmModule.forRoot(),
    SessionModule,
    UserModule,
    AppModule,
    PostModule,
  ],
})
export class ApiModule {}
