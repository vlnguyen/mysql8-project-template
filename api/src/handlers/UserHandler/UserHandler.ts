import { Injectable } from '@nestjs/common';
import { EntityManager, SqlEntityRepository } from '@mikro-orm/mysql';
import { IUserHandler } from './IUserHandler';
import { UserDto } from '../../infrastructure/dto/UserDto';
import { User } from '../../infrastructure/mikroorm/entities/User.entity';
import { mapToPostDto } from '../PostHandler/PostHandler';

@Injectable()
export class UserHandler implements IUserHandler {
  private userRepo: SqlEntityRepository<User>;
  constructor(em: EntityManager) {
    this.userRepo = em.getRepository(User);
  }

  async getUser(
    id: number,
    includePosts: boolean = false,
  ): Promise<UserDto | null> {
    return mapToUserDto(
      await this.userRepo.findOne(
        { id },
        { populate: includePosts && ['posts'] },
      ),
    );
  }

  async getUserByUsername(username: string): Promise<UserDto> {
    return mapToUserDto(await this.userRepo.findOne({ name: username }));
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
  userDto.password = user.password;
  userDto.dateCreated = user.dateCreated;
  if (user.posts.isInitialized() && loadPosts) {
    userDto.posts = user.posts
      .getItems()
      .map((post) => mapToPostDto(post, false));
  }
  return userDto;
}
