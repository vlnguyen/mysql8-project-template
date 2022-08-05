import { UserDto } from 'src/infrastructure/dto/UserDto';

export const IUserEngineProvider = 'IUserEngine';
export class IUserEngine {
  getUser: (id: number) => Promise<UserDto | null>;
}
