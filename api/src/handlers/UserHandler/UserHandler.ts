import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from 'src/infrastructure/dto/UserDto';
import { dataSourceProviderKey } from 'src/infrastructure/typeorm/database.providers';
import { User } from 'src/infrastructure/typeorm/entities/User.entity';
import { DataSource, Repository } from 'typeorm';
import { IUserHandler } from './IUserHandler';

@Injectable()
export class UserHandler implements IUserHandler {
  private userRepo: Repository<User>;
  constructor(@Inject(dataSourceProviderKey) dataSource: DataSource) {
    this.userRepo = dataSource.getRepository(User);
  }

  async getUser(id: number): Promise<UserDto | null> {
    return mapToUserDto(await this.userRepo.findOne({ where: { id } }));
  }
}

function mapToUserDto(user: User | null) {
  if (!user) {
    return null;
  }
  const userDto = new UserDto();
  userDto.id = user.id;
  userDto.name = user.name;
  userDto.dateCreated = user.dateCreated;
  return userDto;
}
