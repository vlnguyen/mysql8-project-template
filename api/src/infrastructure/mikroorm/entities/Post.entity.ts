import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from './User.entity';

@Entity({ tableName: 'posts' })
export class Post {
  @PrimaryKey({ fieldName: 'post_id', type: 'int' })
  id: number;

  @Property({ fieldName: 'post_user_id', type: 'int' })
  userId: number;

  @ManyToOne({ fieldName: 'post_user_id', entity: () => User })
  user: User;

  @Property({ fieldName: 'post_body', type: 'string' })
  body: string;

  @Property({ fieldName: 'post_date_created', type: 'datetime' })
  dateCreated: Date;
}
