import * as testRepository from "../repositories/testRepository";
import * as categoryRepository from "../repositories/categoryRepository";
import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository";

import { ITestType } from "../types/testType";

export async function createTest(name: string, pdfUrl: string, categoryId: number, teacherDisciplineId: number) {
    //verifica se categoria existe
    const category = await categoryRepository.getCategoryById(categoryId);

    if(!category) {
        throw { type: "not_found", message: "unregistered category" };
    }
    console.log(category);

    //verifica se relação professor/disciplina existe
    const teacherDiscipline = await teacherDisciplineRepository.getTeacherDisciplineById(teacherDisciplineId);

    if(!teacherDiscipline) {
        throw { type: "not_found", message: "unregistered relation teacher/discipline" };
    }

    const testData: ITestType = { name, pdfUrl, categoryId, teacherDisciplineId }

    await testRepository.insert(testData);
}

export async function getTestsByTerms() {
    const result = await testRepository.getTestsByTerms();

    if (!result) {
        throw { type: "not_found", message: "unregistered term" }
    }

    return result;
}

export async function getTestsByTeachers() {
    const result = await testRepository.getTestsByTeachers();

    if (!result) {
        throw { type: "not_found", message: "unregistered teacher" }
    }

    return result;
}