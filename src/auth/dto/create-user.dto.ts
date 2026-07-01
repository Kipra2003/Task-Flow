
import * as zod from 'zod';
import{createZodDto} from 'nestjs-zod';
const CreateUserSchema = zod.object({
    email: zod.email({
        message: "Please provide a valid corporate email address." 
    }),
    password: zod.string().trim().min(6),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}