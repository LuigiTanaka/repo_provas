import { Request, Response } from 'express';

import * as authService from '../services/authService';

export async function signUp(req: Request, res: Response) {
    const { email, password, confirmPassword } = req.body;

    await authService.signUp(email, password, confirmPassword);

    res.status(201).send("user registered successfully!");
}

export async function signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await authService.signIn(email, password);

    res.status(200).send({ token });
}