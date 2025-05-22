export interface AuthRegisterReq {
    username: string;
    password: string;
    email: string;
    first_name: string;
    last_name: string;
}

export interface AuthLoginReq {
    username: string;
    password: string;
}
