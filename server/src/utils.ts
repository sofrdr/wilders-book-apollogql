import { DataSource } from 'typeorm';
import { Wilder } from './entities/Wilder';
import { Skill } from './entities/Skill';
import { User } from './entities/User';

const appDataSource = new DataSource({
   type: 'sqlite',
   database: './wilderdb.sqlite',
   synchronize: true,
   entities: [Wilder, Skill, User],
});

export default appDataSource;
