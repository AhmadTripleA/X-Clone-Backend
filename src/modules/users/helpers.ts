import { randomUUID } from 'crypto';

export function generateUsername(first_name: string, last_name?: string) {
    let username: string;

    if (first_name && last_name) {
        username = `${first_name}_${last_name}_${randomUUID()}`;
    }
    if (first_name) {
        username = `${first_name}_${randomUUID()}`;
    } else 
        username = String(randomUUID());

    return username;
}
