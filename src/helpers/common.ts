import { ZodType } from "zod";

export function validateData<T>(data: T, schema: ZodType<T>): void {
    schema.parse(data);
    console.log(`*** Validation Success ***`);
}