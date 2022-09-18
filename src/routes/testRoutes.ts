import { Router } from "express";
import testSchema from "../schemas/testSchema";
import { validateSchema } from "../middlewares/schemaValidator";
import { validateToken } from "../middlewares/validateToken";

import { createTest, getTestsByTerms, getTestsByTeachers } from "../controllers/testController";

const testRouter = Router();

testRouter.use(validateToken);
testRouter.post("/tests", validateSchema(testSchema), createTest);
testRouter.get("/tests/terms", getTestsByTerms);
testRouter.get("/tests/teachers", getTestsByTeachers);

export default testRouter;

/* [
    {
        term: 1,
        disciplines: [
            {
                name: "HTML",
                categories: [
                    {
                        name: "P1",
                        tests: [
                            {
                                name: "Globo.com",
                                teacher: "Lele"
                            },
                            {
                                name: "Globo.com",
                                teacher: "Lele"
                            }
                        ]
                    },
                    {
                        name: "P2",
                        tests: [
                            {
                                name: "Globo.com",
                                teacher: "Lele"
                            },
                            {
                                name: "Globo.com",
                                teacher: "Lele"
                            }
                        ]
                    }
                ]
            },
            {
                name: "JS",
                categories: [
                    {
                        name: "P1",
                        tests: [
                            {
                                name: "Globo.com",
                                teacher: "Lele"
                            },
                            {
                                name: "Globo.com",
                                teacher: "Lele"
                            }
                        ]
                    },
                    {
                        name: "P2",
                        tests: [
                            {
                                name: "Globo.com",
                                teacher: "Lele"
                            },
                            {
                                name: "Globo.com",
                                teacher: "Lele"
                            }
                        ]
                    }
                ]
            }
        ]
    }
] */