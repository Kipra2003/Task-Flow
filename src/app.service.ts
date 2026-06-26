import { Injectable,Inject } from '@nestjs/common';
import { PG_CONNECTION } from './contants';

@Injectable()
export class AppService {
  constructor(@Inject(PG_CONNECTION) private readonly db: any) {}

  async getHello(): Promise<any> {
    console.log('db', this.db.query);
    const res = await this.db.query("SELECT CURRENT_TIME;");
    console.log('res', res.rows);
    return res.rows;
  }
}
