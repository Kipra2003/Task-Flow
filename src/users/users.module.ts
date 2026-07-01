import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProjectModule } from '../project/project.module';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [ProjectModule,AuthModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
