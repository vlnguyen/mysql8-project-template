import { UserDto } from '../../infrastructure/dto/UserDto';

export const IUserManagerProvider = 'IUserManager';
export interface IUserManager {
  getUser: (id: number) => Promise<UserDto | null>;
}
