import { Injectable } from '@nestjs/common';
import { EntityManager, SqlEntityRepository } from '@mikro-orm/mysql';
import { IUserHandler } from './IUserHandler';
import { UserDto } from 'src/infrastructure/dto/UserDto';
import { User } from 'src/infrastructure/mikroorm/entities/User.entity';
import { mapToPostDto } from '../PostHandler/PostHandler';

@Injectable()
export class UserHandler implements IUserHandler {
  private userRepo: SqlEntityRepository<User>;
  constructor(em: EntityManager) {
    this.userRepo = em.getRepository(User);
  }

  async getUser(id: number): Promise<UserDto | null> {
    return mapToUserDto(
      await this.userRepo.findOne({ id }, { populate: ['posts'] }),
    );
  }
}

export function mapToUserDto(
  user: User | null,
  loadPosts: boolean = true,
): UserDto | null {
  if (!user) {
    return null;
  }
  const userDto = new UserDto();
  userDto.id = user.id;
  userDto.name = user.name;
  userDto.dateCreated = user.dateCreated;
  if (user.posts.isInitialized() && loadPosts) {
    userDto.posts = user.posts
      .getItems()
      .map((post) => mapToPostDto(post, false));
  }
  return userDto;
}
