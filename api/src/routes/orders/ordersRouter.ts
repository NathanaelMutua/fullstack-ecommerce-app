import { Router } from "express";
import { validateData } from "../../middlewares/validationMiddleware";
import { InsertOrderSchema } from "../../db/ordersSchema";
import { verifyToken } from "../../middlewares/authMiddleware";

const ordersRouter = Router();

ordersRouter.post("/", verifyToken, validateData(InsertOrderSchema));

export default ordersRouter;
