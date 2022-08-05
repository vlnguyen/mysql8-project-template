import { UserDto } from 'src/infrastructure/dto/UserDto';

export const IUserHandlerProvider = 'IUserHandler';
export interface IUserHandler {
  getUser: (id: number) => Promise<UserDto | null>;
}
