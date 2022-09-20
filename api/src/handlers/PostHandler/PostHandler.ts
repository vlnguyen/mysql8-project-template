import { EntityManager, SqlEntityRepository } from '@mikro-orm/mysql';
import { Injectable } from '@nestjs/common';
import { PostDto } from 'src/infrastructure/dto/PostDto';
import { Post } from 'src/infrastructure/mikroorm/entities/Post.entity';
import { mapToUserDto } from '../UserHandler/UserHandler';
import { IPostHandler } from './IPostHandler';

@Injectable()
export class PostHandler implements IPostHandler {
  private postRepo: SqlEntityRepository<Post>;
  constructor(em: EntityManager) {
    this.postRepo = em.getRepository(Post);
  }
}

export function mapToPostDto(post: Post | null, loadUser: boolean = true) {
  if (!post) {
    return null;
  }
  const postDto = new PostDto();
  postDto.id = post.id;
  postDto.userId = post.userId;
  postDto.body = post.body;
  postDto.dateCreated = post.dateCreated;
  if (loadUser) {
    postDto.user = mapToUserDto(post.user, false);
  }
  return postDto;
}
