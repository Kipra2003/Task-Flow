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
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService
        ,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService
        }
        ,
        JwtService
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
    
  })


});
