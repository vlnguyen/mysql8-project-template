import { Post } from './entities/Post.entity';
import { User } from './entities/User.entity';

// TODO: load config from environment
export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  user: 'appuser',
  password: 'appuserpassword',
  dbName: 'application',
  entities: [User, Post],
  entitiesTs: ['./src/infrastructure/mikroorm/entities/*.ts'],
};
