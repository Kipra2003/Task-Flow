import { Controller, Post,Get,Req,UseGuards} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import { Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import {  SALT_ROUNDS} from './auth.constants';
import type Request from 'express';
import { AuthGuard } from './auth.guard';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto): Promise<any> {
        // Implement registration logic here
            console.log('email', createUserDto.email);
            console.log('password', createUserDto.password);
            const pwd = (createUserDto.password) ? createUserDto.password : '';
            const hashedPassword = await bcrypt.hash(pwd, SALT_ROUNDS);
        return this.authService.register({ ...createUserDto, password: hashedPassword });
        // return { message: 'User registered successfully' };
    }
    @AuthGuard('Auth')
    @Post('login')
    async login(@Body() createUserDto: CreateUserDto): Promise<any>  {
        // Implement login logic here'
        // console.log('email', createUserDto.email);
        // console.log('password', createUserDto.password);
        // const pwd = (createUserDto.password) ? createUserDto.password : '';
        // const hashedPassword = await bcrypt.hash(pwd, saltRounds);
        
        return this.authService.login(createUserDto);
    }
}
