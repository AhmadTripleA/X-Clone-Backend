import z from "zod";

export const createPostBodyVal = z.object({
    content: z.record(z.string(), z.any()),
    hashtags: z.string().array()
});