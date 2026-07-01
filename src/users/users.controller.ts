import { Controller, Query } from '@nestjs/common';
import {Request, Post} from '@nestjs/common';
import { AuthGuard} from 'src/auth/auth.guard';
import { UseGuards,Body,Inject} from '@nestjs/common';
import { UsersService } from './users.service';
import {ProjectService} from '../project/project.service';

@Controller('users')
export class UsersController {
    constructor(@Inject(ProjectService) private readonly projectService: ProjectService) {}

    @UseGuards(AuthGuard)
    @Post('create-project')
    async createProject(@Body() { name }: { name: string },@Request() req: Request): Promise<any> {
        
        const res = await this.projectService.createProject(name, req['user']);
        await this.projectService.addMember(res.project.id, req['user']);
        return {
            message: 'Project created successfully',
        }
    }
    @UseGuards(AuthGuard)
    @Post('add-member')
    async addMember(@Query('projectId') projectId: number, @Request() req: Request): Promise<any> {
        const userEmail = req['user'];
        const res = await this.projectService.findById(projectId);
        if(!res) {
            return { message: 'Project not found' };
        }
        if(res.owner !== userEmail) {
            return { message: 'Only the project owner can add members' };
        }
        return await this.projectService.addMember(projectId, userEmail);
    }

}
