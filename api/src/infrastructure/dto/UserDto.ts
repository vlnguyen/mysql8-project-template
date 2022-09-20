import { PostDto } from './PostDto';

export class UserDto {
  id: number;
  name: string;
  password: string;
  dateCreated: Date;
  posts?: PostDto[];
}
