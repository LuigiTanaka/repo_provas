import supertest from "supertest";
import prisma from "../src/config/database";
import app from "../src/app";

import userFactory from "./factories/userFactory";
import { faker } from "@faker-js/faker";
import testFactory from "./factories/testFactory";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "tests"`;
});

describe("Testa POST /tests", () => {
    it("Deve retornar status 201 e cadatrar o prova se for enviado um formato correto", async () => {
        //cadastra usuário
        const user = userFactory();

        await supertest(app).post("/sign-up").send(user);

        const createdUser = await prisma.user.findUnique({
            where: { email: user.email }
        });

        expect(createdUser).not.toBeNull();

        //realiza login do usuário criado
        const loggedUser = await supertest(app).post("/sign-in").send({ email: user.email, password: user.password });

        expect(loggedUser.status).toBe(200);
        expect(loggedUser.body.token).not.toBeNull();

        //obtem id de categoria existente
        const registeredCategory = await prisma.category.findFirst();
        if (!registeredCategory) {
            return expect(registeredCategory).not.toBeNull();
        }
        const registeredCategoryId = registeredCategory.id;

        //obtem id de relação professor/disciplina existente
        const registeredTeacherDiscipline = await prisma.teacherDiscipline.findFirst();
        if (!registeredTeacherDiscipline) {
            return expect(registeredTeacherDiscipline).not.toBeNull();
        }
        const registeredTeacherDisciplineId = registeredTeacherDiscipline.id;

        //teste
        const test = testFactory(registeredCategoryId, registeredTeacherDisciplineId);

        const result = await supertest(app).post("/tests").set({ Authorization: `Bearer ${loggedUser.body.token}` }).send(test);

        expect(result.status).toBe(201);
    });

    it("Deve retornar status 404 se categoria não estiver cadastrada", async () => {
        //cadastra usuário
        const user = userFactory();

        await supertest(app).post("/sign-up").send(user);

        const createdUser = await prisma.user.findUnique({
            where: { email: user.email }
        });

        expect(createdUser).not.toBeNull();

        //realiza login do usuário criado
        const loggedUser = await supertest(app).post("/sign-in").send({ email: user.email, password: user.password });

        expect(loggedUser.status).toBe(200);
        expect(loggedUser.body.token).not.toBeNull();

        //obtem id de categoria inexistente
        const lastRegisteredCategory = await prisma.category.findFirst({ orderBy: { id: "desc" } });
        if (!lastRegisteredCategory) {
            return expect(lastRegisteredCategory).not.toBeNull();
        }
        const unregisteredCategoryId = lastRegisteredCategory.id + 1;

        //obtem id de relação professor/disciplina existente
        const registeredTeacherDiscipline = await prisma.teacherDiscipline.findFirst();
        if (!registeredTeacherDiscipline) {
            return expect(registeredTeacherDiscipline).not.toBeNull();
        }
        const registeredTeacherDisciplineId = registeredTeacherDiscipline.id;

        //teste
        const test = testFactory(unregisteredCategoryId, registeredTeacherDisciplineId);

        const result = await supertest(app).post("/tests").set({ Authorization: `Bearer ${loggedUser.body.token}` }).send(test);

        expect(result.status).toBe(404);
    });

    it("Deve retornar status 404 se relação professor/disciplina não estiver cadastrada", async () => {
        //cadastra usuário
        const user = userFactory();

        await supertest(app).post("/sign-up").send(user);

        const createdUser = await prisma.user.findUnique({
            where: { email: user.email }
        });

        expect(createdUser).not.toBeNull();

        //realiza login do usuário criado
        const loggedUser = await supertest(app).post("/sign-in").send({ email: user.email, password: user.password });

        expect(loggedUser.status).toBe(200);
        expect(loggedUser.body.token).not.toBeNull();

        //obtem id de categoria existente
        const registeredCategory = await prisma.category.findFirst();
        if (!registeredCategory) {
            return expect(registeredCategory).not.toBeNull();
        }
        const registeredCategoryId = registeredCategory.id;

        //obtem id de relação professor/disciplina inexistente
        const lastRegisteredTeacherDiscipline = await prisma.teacherDiscipline.findFirst({ orderBy: { id: "desc" } });
        if (!lastRegisteredTeacherDiscipline) {
            return expect(lastRegisteredTeacherDiscipline).not.toBeNull();
        }
        const unregisteredTeacherDisciplineId = lastRegisteredTeacherDiscipline.id + 1;

        //teste
        const test = testFactory(registeredCategoryId, unregisteredTeacherDisciplineId);

        const result = await supertest(app).post("/tests").set({ Authorization: `Bearer ${loggedUser.body.token}` }).send(test);

        expect(result.status).toBe(404);
    });

    it("Deve retornar status 401 se token inválido", async () => {
        const invalidToken = faker.random.word();

        const result = await supertest(app).post("/tests").set({ Authorization: `Bearer ${invalidToken}` }).send();

        expect(result.status).toBe(401);
    });
});

describe("Testa GET /tests/terms", () => {
    it("Deve retornar status 200 e o body no formato de array se enviado token válido", async () => {
        //cadastra usuário
        const user = userFactory();

        await supertest(app).post("/sign-up").send(user);

        const createdUser = await prisma.user.findUnique({
            where: { email: user.email }
        });

        expect(createdUser).not.toBeNull();

        //realiza login do usuário criado
        const loggedUser = await supertest(app).post("/sign-in").send({ email: user.email, password: user.password });

        expect(loggedUser.status).toBe(200);
        expect(loggedUser.body.token).not.toBeNull();

        //teste
        const result = await supertest(app).get("/tests/terms").set({ Authorization: `Bearer ${loggedUser.body.token}` }).send();

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
    });

    it("Deve retornar status 401 se token inválido", async () => {
        const invalidToken = faker.random.word();

        const result = await supertest(app).post("/tests/terms").set({ Authorization: `Bearer ${invalidToken}` }).send();

        expect(result.status).toBe(401);
    });
});

describe("Testa GET /tests/teachers", () => {
    it("Deve retornar status 200 e o body no formato de array se enviado token válido", async () => {
        //cadastra usuário
        const user = userFactory();

        await supertest(app).post("/sign-up").send(user);

        const createdUser = await prisma.user.findUnique({
            where: { email: user.email }
        });

        expect(createdUser).not.toBeNull();

        //realiza login do usuário criado
        const loggedUser = await supertest(app).post("/sign-in").send({ email: user.email, password: user.password });

        expect(loggedUser.status).toBe(200);
        expect(loggedUser.body.token).not.toBeNull();

        //teste
        const result = await supertest(app).get("/tests/teachers").set({ Authorization: `Bearer ${loggedUser.body.token}` }).send();

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
    });

    it("Deve retornar status 401 se token inválido", async () => {
        const invalidToken = faker.random.word();

        const result = await supertest(app).post("/tests/teachers").set({ Authorization: `Bearer ${invalidToken}` }).send();

        expect(result.status).toBe(401);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});