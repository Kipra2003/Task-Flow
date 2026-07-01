import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { DatabaseModule } from 'src/database/database.module';
// import { PG_CONNECTION } from 'src/contants';
@Module({
  imports:[DatabaseModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService]
})
export class ProjectModule {}
