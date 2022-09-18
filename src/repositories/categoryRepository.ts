import prisma from "../config/database";

export async function getCategoryById(categoryId: number) {
    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    return category;
}