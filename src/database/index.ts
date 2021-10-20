import {
  Connection,
  createConnection,
  EntityTarget,
  MongoRepository,
} from 'typeorm';
import config from './config';

let connection: Connection | null = null;

export const getConnection = async (): Promise<Connection> => {
  if (connection !== null) {
    return connection;
  }
  connection = await createConnection(config);
  return connection;
};

export const getRepository = async <T>(
  entity: EntityTarget<T>
): Promise<MongoRepository<T>> => {
  const db = await getConnection();
  return db.getMongoRepository(entity);
};
