import { faker } from "@faker-js/faker";

export default function testFactory(categoryId: number, teacherDisciplineId: number) {
    return {
        name: faker.word.noun(),
        pdfUrl: faker.internet.url(),
        categoryId,
        teacherDisciplineId
    }
}