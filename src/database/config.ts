import { ConnectionOptions } from 'typeorm';

export default {
  type: 'mongodb',
  host: '127.0.0.1',
  port: 27017,
  authSource: 'admin',
  username: 'root',
  password: 'myPassword',
  database: 'test',
  entities: [`${__dirname}/../models/**/*.js`],
  migrations: [`${__dirname}/../migrations/**/*.js`],
  synchronize: false,
  dropSchema: false,
} as ConnectionOptions;
