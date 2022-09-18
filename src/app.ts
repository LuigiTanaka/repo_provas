import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import router from "./routes/index";
import errorHandlerMiddleware from "./middlewares/errorMiddleware";

const app = express();
app.use(cors());
app.use(json());

app.use(router);
app.use(errorHandlerMiddleware);

export default app;