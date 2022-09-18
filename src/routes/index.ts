import { Router } from "express"

import authRouter from "./authRouter";
import testRouter from "./testRoutes"; 

const router = Router();

router.get("/", (req, res) => {
    res.send("Online");
})

router.use(authRouter);
router.use(testRouter);

export default router;