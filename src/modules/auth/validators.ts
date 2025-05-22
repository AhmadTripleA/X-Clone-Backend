import z from "zod";

export const AuthRegisterReqValidator = z.object({
    username: z.string(),
    password: z.string(),
    first_name: z.string(),
    last_name: z.string(),
});

export const AuthLoginReqValidator = z.object({
    username: z.string(),
    password: z.string(),
}).strict('No Extra Data Allowed');


export const zEmail = z.string().superRefine((val, ctx) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    
    if(!emailRegex.test(val)){
        console.log(`xxx Email Validation Failed xxx`);
        return ctx.addIssue({
            code: "custom",
            message: `Email format is incorrect: ${val}`,
            fatal: true
        })
    }
    
    console.log(`*** Email Validation Success ***`);
})