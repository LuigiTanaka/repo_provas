import supertest from "supertest";
import app from "../src/app";
import prisma from "../src/config/database";

import userFactory from "./factories/userFactory";
import userWithWrongPasswordFactory from "./factories/userWithWrongPasswordFactory";

beforeAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users"`;
});

describe("Testa POST /sign-up", () => {
    it("Deve retornar status 201 e cadatrar o usuário se for enviado um formato correto", async () => {
        const user = userFactory();

        const result = await supertest(app).post("/sign-up").send(user);

        const createdUser = await prisma.user.findUnique({
            where: { email: user.email }
        });

        expect(result.status).toBe(201);
        expect(createdUser).not.toBeNull();
    });

    it("Deve retornar status 409 se email já estiver cadastrado", async () => {
        const user = userFactory();

        await supertest(app).post("/sign-up").send(user);
        const result = await supertest(app).post("/sign-up").send(user);

        expect(result.status).toBe(409);
    });

    it("Deve retornar status 400 se as senhas forem divergentes", async () => {
        const user = userWithWrongPasswordFactory();

        await supertest(app).post("/sign-up").send(user);
        const result = await supertest(app).post("/sign-up").send(user);

        expect(result.status).toBe(400);
    });
});

describe("Testa POST /sign-in", () => {
    it("Deve retornar status 200 e token se for enviado email e senha corretos", async () => {
        const user = userFactory();

        await supertest(app).post("/sign-up").send(user);

        const createdUser = await prisma.user.findUnique({
            where: { email: user.email }
        });

        expect(createdUser).not.toBeNull();

        const result = await supertest(app).post("/sign-in").send({ email: user.email, password: user.password });

        expect(result.status).toBe(200);
        expect(result.body.token).not.toBeNull();
    });

    it("Deve retornar status 401 se email incorreto", async () => {
        const user = userFactory();

        await supertest(app).post("/sign-up").send(user);

        const createdUser = await prisma.user.findUnique({
            where: { email: user.email }
        });

        expect(createdUser).not.toBeNull();

        const result = await supertest(app).post("/sign-in").send({ email: "wrong@gmail.com", password: user.password });

        expect(result.status).toBe(401);
    });

    it("Deve retornar status 401 se senha incorreta", async () => {
        const user = userFactory();

        await supertest(app).post("/sign-up").send(user);

        const createdUser = await prisma.user.findUnique({
            where: { email: user.email }
        });

        expect(createdUser).not.toBeNull();

        const result = await supertest(app).post("/sign-in").send({ email: user.email, password: "wrong password" });

        expect(result.status).toBe(401);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});