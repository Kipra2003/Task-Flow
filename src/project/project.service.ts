import { Injectable,Inject} from '@nestjs/common';
import {PG_CONNECTION} from '../contants';
@Injectable()
export class ProjectService {
    constructor(@Inject(PG_CONNECTION) private readonly db: any) {}
    async createProject(name: string, owner: string): Promise<any> {
        // Here you would typically interact with your database to create a project.
        // For demonstration, we'll just return a mock response.
        const res = await this.db.query(`INSERT INTO Projects (name, owner) VALUES ($1, $2) RETURNING *`, [name, owner]);
        return {
            project: res.rows[0],
        };
    }
    async findById(projectId: number): Promise<any> {
        const res = await this.db.query(`SELECT * FROM Projects WHERE id = $1`, [projectId]);
        if(res.rows.length === 0) {
            return null;
        }
        return res.rows[0];
    }
    async addMember(projectId: number, userEmail: string): Promise<any> {
        await this.db.query(`INSERT INTO ProjectMembers (project_id, user_email) VALUES ($1, $2)`, [projectId, userEmail]);
        return {
            message: 'Member added successfully',
        };
    }
}
