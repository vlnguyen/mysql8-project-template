import { UserDto } from 'src/infrastructure/dto/UserDto';

export const IUserManagerProvider = 'IUserManager';
export interface IUserManager {
  getUser: (id: number) => Promise<GetUserResponse>;
}

export interface GetUserResponse {
  user: UserDto | null;
}
