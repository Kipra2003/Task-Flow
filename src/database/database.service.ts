import { Injectable ,Inject} from '@nestjs/common';
import { PG_CONNECTION } from '../contants';
@Injectable()
export class DatabaseService {
    
    constructor(@Inject(PG_CONNECTION) private readonly pgConnection: any){}

    async findUserByEmail(email: String){
        return await this.pgConnection.query(`SELECT * FROM Users WHERE email = $1`, [email]);
    }

    async insertIntoUser(email: String,password: String){
        await this.pgConnection.query(`INSERT INTO Users (email, password) VALUES ($1, $2)`, [email, password]);
    } 
}
