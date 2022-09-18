import prisma from "../config/database";

export async function getTeacherDisciplineById(teacherDisciplineId: number) {
    const teacherDiscipline = await prisma.teacherDiscipline.findUnique({ where: { id: teacherDisciplineId } });
    return teacherDiscipline;
}