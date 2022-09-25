import { Exclude } from 'class-transformer';
import { PostDto } from './PostDto';

export class UserDto {
  id: number;
  name: string;

  @Exclude()
  password: string;

  dateCreated: Date;
  posts?: PostDto[];
}
