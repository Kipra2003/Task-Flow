import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule} from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
@Module({
  imports: [JwtModule.register({ 
      secret: process.env.JWT_SECRET,
      global: true, // Makes JwtService available everywhere
   }), DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService,AuthGuard],
  exports: [AuthGuard] 
})
export class AuthModule {}
