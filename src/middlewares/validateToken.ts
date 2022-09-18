import { Request, Response, NextFunction } from "express";
import { IJwtPayload } from "../types/authType";
import { findUserById } from "../services/authService";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        throw { type: "unauthorized", message: "missing authorization header" }
    }

    const token = authorization.replace("Bearer ", "");

    if (!token) {
        throw { type: "unauthorized", message: "required token" }
    }

    try {
        const jwtSecret = process.env.JWT_SECRET || "secret";
        const { id } = jwt.verify(token, jwtSecret) as IJwtPayload;
        await findUserById(id);
        res.locals.userId = id;

        next();
    } catch {
        throw { type: "unauthorized", message: "invalid token" }
    }
}