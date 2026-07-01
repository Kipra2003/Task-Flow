import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
// import jest from 'jest-mock';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import {expect,it,describe,beforeEach,jest} from '@jest/globals';
// import { register } from 'module';

describe('AuthController', () => {
  let controller: AuthController;

  let mockAuthService = {
     register: jest.fn((createUserDto: CreateUserDto) => {
          
     }),
     login: jest.fn((createUserDto: CreateUserDto)=>{
      
     })
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {

      it('should register a user', async () => {
          const dto = {email: "test@example.com",password:"123456"};

          const result = {
            email: "test@example.com",
            message: "User registered successfully"
          };

          mockAuthService.register.mockResolvedValue(result);
          
          const res = await controller.register(dto);

          expect(res).toEqual(result);
          
          console.log(res);
      });

      it('user already exist',async () =>{
          const dto = {email: "test@example.com",password:"123456"};
          const result = {
            message: "User already exists"
          }

          mockAuthService.login.mockResolvedValue(result);

          const res = await controller.login(dto);
          expect(res).toEqual(result);
          console.log(res);
      });

      // it('user already exist', async => {
          
      // });
  });
});

