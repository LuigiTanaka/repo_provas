import { Router } from "express";
import signUpSchema from "../schemas/signUpSchema";
import signInSchema from "../schemas/signInSchema";
import { validateSchema } from "../middlewares/schemaValidator";
import { signUp, signIn } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), signUp);
authRouter.post("/sign-in", validateSchema(signInSchema), signIn);

export default authRouter;