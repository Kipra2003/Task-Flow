import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import {ProjectService} from '../project/project.service';
@Injectable()
export class UsersService {
    constructor(@Inject(ProjectService) private readonly projectService: ProjectService) {}

    
}
