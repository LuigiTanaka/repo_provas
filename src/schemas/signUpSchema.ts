import joi from "joi";
import { ISignUpType } from "../types/authType";

const signUpSchema = joi.object<ISignUpType>({
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required()
});

export default signUpSchema;