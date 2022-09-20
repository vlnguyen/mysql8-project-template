import { PostDto } from './PostDto';

export class UserDto {
  id: number;
  name: string;
  dateCreated: Date;
  posts?: PostDto[];
}
