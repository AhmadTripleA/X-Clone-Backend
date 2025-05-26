import z from 'zod';
import { zEmail } from '../auth/validators';

export const createUserReqVal = z.object({ first_name: z.string(), last_name: z.string(), image_uri: z.string() });

export const getByIdParamsVal = z.object({ id: z.string() });

export const updateUserReqVal = z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: zEmail.optional(),
}).strict();