import { DataSource } from 'typeorm';
import { Wilder } from './entities/Wilder';
import { Skill } from './entities/Skill';

const appDataSource = new DataSource({
  type: 'sqlite',
  database: './wilderdb.sqlite',
  synchronize: true,
  entities: [Wilder, Skill],
});

export default appDataSource;
