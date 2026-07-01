import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { DatabaseService } from '../database/database.service';
import {expect,it,describe,beforeEach,jest} from '@jest/globals';
import { JwtService } from '@nestjs/jwt';


describe('AuthService', () => {
  let service: AuthService;
  let mockDatabaseService = {
      findUserByEmail: jest.fn(),
      insertIntoUser: jest.fn()
  }
  let mockJwtService = {
    sign: jest.fn(),
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService
        ,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService
        }
        ,
        {
          provide: JwtService,
          useValue: mockJwtService
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
      it('should register the user',async ()=>{
          const dto = {email: "test@example.com",password:"123456"};

          const result = {
            email: "test@example.com",
            message: "User registered successfully"
          };

          mockDatabaseService.findUserByEmail.mockResolvedValue({
            rows: [],
          });
          mockDatabaseService.insertIntoUser.mockResolvedValue();
          const res = await service.register(dto);

          expect(res).toEqual(result);
      })
      it('should not register as the user already exists',async ()=> {
          const dto = {email: "test@example.com",password:"123456"};
          const result = {
            message: "User already exists",
          }

          mockDatabaseService.findUserByEmail.mockResolvedValue({
            rows: [{
              email:"test@example.com",
              password:Date.now().toString(),
            }]
          })

          mockDatabaseService.insertIntoUser.mockResolvedValue();
          const res = await service.register(dto);
          expect(res).toEqual(result); 
      })
  })

  describe('login',() => {
      it('should give invalid email as the user does not exist',async ()=>{
          const dto = {
            email:"prr@gmail.com",
            password:"123456"
          }
          const result = {
            message: "Invalid email"
          }

          mockDatabaseService.findUserByEmail.mockResolvedValue({
            rows: []
          })

          const res = await service.login(dto);
          expect(res).toEqual(result);
      })

      it('should give invalid password as the password is wrong',async ()=>{

          const dto = {
            email:"prr@gmail.com",
            password:"12345"
          }
          const result = {
            message: "Invalid password"
          }

          mockDatabaseService.findUserByEmail.mockResolvedValue({
            rows: [{
              email:"prr@gmail.com",
              password: "$2b$10$wYF7ei0WT8CTa0Gsuaysb.ka9Y7iHr2HVNixKK5hxsCdMMJNtKrG."
            }]
          })
          const res = await service.login(dto);
          expect(res).toEqual(result);
      })

      it('should give the token as the user is valid', async ()=>{

          const dto = {
            email:"prr@gmail.com",
            password:"123456",
          }
          const result = {
            token: "sample-jwt-token"
          }

          mockDatabaseService.findUserByEmail.mockResolvedValue({
            rows: [{
              email:"prr@gmail.com",
              password: "$2b$10$wYF7ei0WT8CTa0Gsuaysb.ka9Y7iHr2HVNixKK5hxsCdMMJNtKrG.",
            }]
          })
          mockJwtService.sign.mockReturnValue("sample-jwt-token");
          const res = await service.login(dto);
          expect(res).toEqual(result);
      })
  })


});

// {
//   "email":"prr@gmail.com",
//   "password":"123456"
// }
// $2b$10$wYF7ei0WT8CTa0Gsuaysb.ka9Y7iHr2HVNixKK5hxsCdMMJNtKrG.
//