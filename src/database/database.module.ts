import { Module } from '@nestjs/common';
import {PG_CONNECTION} from '../contants';
// import { ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';

const dbProvider = {
  provide: PG_CONNECTION,
  useFactory: async () => {
    const { Pool } = await import('pg');
    const pool = new Pool({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: parseInt(process.env.PG_PORT || '5430', 10),
    });
    return pool;
  },
};



@Module({
  providers: [dbProvider, DatabaseService],
  exports: [dbProvider,DatabaseService],
})
export class DatabaseModule {
}
