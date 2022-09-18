import joi from "joi";
import { ITestType } from "../types/testType";

const testSchema = joi.object<ITestType>({
    name: joi.string().required(),
    pdfUrl: joi.string().uri().required(),
    categoryId: joi.number().required(),
    teacherDisciplineId: joi.number().required()
});

export default testSchema;