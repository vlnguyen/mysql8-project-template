import { UserDto } from '../../infrastructure/dto/UserDto';

export const IUserHandlerProvider = 'IUserHandler';
export interface IUserHandler {
  getUser: (id: number, includePosts?: boolean) => Promise<UserDto | null>;
  getUserByUsername: (username: string) => Promise<UserDto | null>;
}
