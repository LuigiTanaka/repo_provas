import { User } from "@prisma/client";

export type IUserType = Omit<User, "id">;

export interface IJwtPayload {
    id: number
}

export interface ISignUpType {
    email: string
    password: string
    confirmPassword: string
}