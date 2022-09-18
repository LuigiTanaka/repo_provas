import prisma from "../config/database";
import { ITestType } from "../types/testType";

export async function insert(testData: ITestType) {
   await prisma.test.create({ data: testData });
}

export async function getTestsByTerms() {
   const result = await prisma.term.findMany({
      select: {
         number: true,
         disciplines: {
            select: {
               name: true,
               teachersDisciplines: {
                  select: {
                     tests: {
                        distinct: ['categoryId'],
                        select: {
                           category: {
                              select: {
                                 name: true,
                                 tests: {
                                    select: {
                                       name: true,
                                       pdfUrl: true,
                                       teacherDiscipline: {
                                          select: {
                                             teacher: {
                                                select: {
                                                   name: true,
                                                },
                                             },
                                          },
                                       },
                                    },
                                 },
                              },
                           },
                        }, 
                        orderBy: { category: { name: "desc" } }
                     },
                  },
               },
            },
         },
      },
   });

   return result;
}

export async function getTestsByTeachers() {
   const result = await prisma.teacher.findMany({
      select: {
         name: true,
         teachersDisciplines: {
            select: {
               tests: {
                  distinct: ["categoryId"],
                  select: {
                     category: {
                        select: {
                           name: true,
                           tests: {
                              select: {
                                 name: true,
                                 pdfUrl: true,
                                 teacherDiscipline: {
                                    select: {
                                       discipline: {
                                          select: {
                                             name: true,
                                          },
                                       },
                                    },
                                 },
                              },
                           },
                        },
                     },
                  },
                  orderBy: { category: { name: "desc" } },
               },
            },
         },
      },
   });

   return result;
}