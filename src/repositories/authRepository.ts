import prisma from "../config/database";
import { IUserType } from "../types/authType";

export async function getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
}

export async function getUserById(id: number) {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
}

export async function insert(userData: IUserType) {
    await prisma.user.create({ data: userData });
}