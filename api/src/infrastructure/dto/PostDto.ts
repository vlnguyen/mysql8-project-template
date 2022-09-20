import { UserDto } from './UserDto';

export class PostDto {
  id: number;
  userId: number;
  body: string;
  dateCreated: Date;
  user?: UserDto;
}
