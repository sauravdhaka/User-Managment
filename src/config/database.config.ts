import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/users/user.entity';


dotenv.config();

export const databaseConfig = (): TypeOrmModuleOptions => ({
  type: 'mysql', 
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10), 
  username: process.env.DB_USERNAME, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_DATABASE, 
  entities: [User],
  synchronize: true,
});

