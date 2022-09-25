import { UserDto } from 'src/infrastructure/dto/UserDto';

export interface IGetUserResponse {
  user: UserDto | null;
  isSelf: boolean;
}
