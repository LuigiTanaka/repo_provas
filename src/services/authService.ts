import * as authRepository from "../repositories/authRepository";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUserType } from "../types/authType";

dotenv.config();

export async function signUp(email: string, password: string, confirmPassword: string) {
    const existingUser = await authRepository.getUserByEmail(email);

    if (existingUser) {
        throw { type: "conflict", message: "email already registered" }
    }

    if (password !== confirmPassword) {
        throw { type: "bad_request", message: "different passwords" };
    }

    const SALT = 10;
    const passwordHash = bcrypt.hashSync(password, SALT);

    const userData: IUserType = { email, password: passwordHash }

    await authRepository.insert(userData);
}

export async function signIn(email: string, password: string) {
    const existingUser = await authRepository.getUserByEmail(email);

    if (!existingUser) {
        throw { type: "unauthorized", message: "incorrect email or password" };
    }

    const correctPassword = bcrypt.compareSync(password, existingUser.password);

    if (!correctPassword) {
        throw { type: "unauthorized", message: "incorrect email or password" };
    }

    const jwtSecret = process.env.JWT_SECRET || "secret";

    const token = jwt.sign({ id: existingUser.id }, jwtSecret);

    return token;
}

export async function findUserById(id: number) {
    const user = await authRepository.getUserById(id);

    if (!user) {
        throw { type: "not_found", message: "user not found" };
    }

    return user;
}