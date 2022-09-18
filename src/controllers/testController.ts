import { Request, Response } from 'express';

import * as testService from '../services/testService';

export async function createTest(req: Request, res: Response) {
    const { name, pdfUrl, categoryId, teacherDisciplineId } = req.body;

    await testService.createTest(name, pdfUrl, Number(categoryId), Number(teacherDisciplineId));

    res.status(201).send("test created successfully!");
}

export async function getTestsByTerms(req: Request, res: Response) {
    const result = await testService.getTestsByTerms();

    res.status(200).send(result);
}

export async function getTestsByTeachers(req: Request, res: Response) {
    const result = await testService.getTestsByTeachers();

    res.status(200).send(result);
}