import { Post } from './entities/Post.entity';
import { User } from './entities/User.entity';

// TODO: load config from environment
export default {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || 'appuserpassword',
  dbName: process.env.DB_NAME || 'application',
  entities: [User, Post],
  entitiesTs: ['./src/infrastructure/mikroorm/entities/*.ts'],
};
