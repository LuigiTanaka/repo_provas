import joi from "joi";
import { IUserType } from "../types/authType";

const signInSchema = joi.object<IUserType>({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export default signInSchema;