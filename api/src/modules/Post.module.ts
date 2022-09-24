import { Module } from '@nestjs/common';
import { IPostHandlerProvider } from '../handlers/PostHandler/IPostHandler';
import { PostHandler } from '../handlers/PostHandler/PostHandler';

@Module({
  providers: [{ provide: IPostHandlerProvider, useClass: PostHandler }],
})
export class PostModule {}
