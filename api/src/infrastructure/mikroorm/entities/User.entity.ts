import {
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  Collection,
} from '@mikro-orm/core';
import { Post } from './Post.entity';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey({ fieldName: 'user_id', type: 'int' })
  id: number;

  @Property({ fieldName: 'user_name', type: 'string' })
  name: string;

  @Property({ fieldName: 'user_date_created', type: 'datetime' })
  dateCreated: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Collection<Post>;
}
