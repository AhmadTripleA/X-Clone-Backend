import z from 'zod';

export const createUserReqVal = z.object({ first_name: z.string(), last_name: z.string(), image_uri: z.string() });

export const getByIdParamsVal = z.object({ id: z.string() });
