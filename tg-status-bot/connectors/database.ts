import { DataSource, DataSourceOptions, EntityTarget, ObjectLiteral, Repository } from 'typeorm';

import User from '../entities/user';

const sqlJsOptions: DataSourceOptions = {
  type: 'sqljs',
  location: `${process.env.TG_DB_LOCATION || 'tg-data'}/sqljs-data`,
  autoSave: true,
  synchronize: true,
  entities: [User],
};

export class Connection {
  private connection: DataSource;

  constructor(options: DataSourceOptions = sqlJsOptions) {
    this.connection = new DataSource(options);
    this.connection.initialize();
  }

  getRepository<Entity extends ObjectLiteral>(entity: EntityTarget<Entity>): Repository<Entity> {
    return this.connection.getRepository(entity);
  }
}

export const DBConnection = new Connection();
