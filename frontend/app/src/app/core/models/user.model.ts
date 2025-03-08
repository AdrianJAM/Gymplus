import { UserRole } from "../enums/user-roles.enum";

export interface User{
    id?: string;
    name: string;
    email: string;
    role: UserRole;
}