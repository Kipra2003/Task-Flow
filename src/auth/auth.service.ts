import { Inject,Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';
@Injectable()
export class AuthService {
    constructor(
        @Inject() private readonly databaseService: DatabaseService,
        private readonly jwtService: JwtService
    ) {}

    async register({ email, password }: { email: string; password: string }): Promise<any> {
        
        const res = await this.databaseService.findUserByEmail(email);
        if(res.rows.length > 0) {
            return { message: 'User already exists' };
        }
        await this.databaseService.insertIntoUser(email,password);
        // await this.pgConnection.query(`INSERT INTO Users (email, password) VALUES ($1, $2)`, [email, password]);
        return { 
            email,
            message: 'User registered successfully' 
        };
    }
    async login({ email, password }: { email: string; password: string }): Promise<any> {

        const res = await this.databaseService.findUserByEmail(email);
        if(res.rows.length === 0) {
            return { message: 'Invalid email' };
        }
        console.log('password', password);
        console.log('res.rows[0].password', res.rows[0].password);
        password = (password) ? password : '';
        if(!(await bcrypt.compare(password, res.rows[0].password))) {
            return { message: 'Invalid password' };
        }
        
        const payload = { 
            email: res.rows[0].email,
            password: res.rows[0].password,
        };

        const token = this.jwtService.sign(payload,{
            secret: process.env.JWT_SECRET,
        });

        return { token };
    }   
}   
