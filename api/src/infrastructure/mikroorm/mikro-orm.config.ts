import { Post } from './entities/Post.entity';
import { User } from './entities/User.entity';

// TODO: load config from environment
export default {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: 'appuser',
  password: 'appuserpassword',
  dbName: 'application',
  entities: [User, Post],
  entitiesTs: ['./src/infrastructure/mikroorm/entities/*.ts'],
};
