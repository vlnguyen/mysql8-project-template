import { DataSource } from 'typeorm';

export const dataSourceProviderKey = 'DATA_SOURCE';
export const dataSourceProvider = {
  provide: dataSourceProviderKey,
  useFactory: async () => {
    // TODO: load connection from env
    const dataSource = new DataSource({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'appuser',
      password: 'appuserpassword',
      database: 'application',
      entities: [__dirname + '/entities/*.entity.{js,ts}'],
      synchronize: false,
    });
    return dataSource.initialize();
  },
};
