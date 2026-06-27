import { Injectable,Inject } from '@nestjs/common';
import { PG_CONNECTION } from './contants';

@Injectable()
export class AppService {
  constructor(@Inject(PG_CONNECTION) private readonly db: any) {}

  async getHello(): Promise<any> {
    // console.log('db', this.db.query);
    return {
      message: 'Hello World!',
    }
  }
}
