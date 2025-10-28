import { Router } from "express";
import { validateData } from "../../middlewares/validationMiddleware";
import { insertOrderWithItemsSchema } from "../../db/ordersSchema";
import { verifyToken } from "../../middlewares/authMiddleware";
import { createOrder } from "../../controllers/ordersController";

const ordersRouter = Router();

ordersRouter.post(
  "/",
  verifyToken,
  validateData(insertOrderWithItemsSchema),
  createOrder
);

export default ordersRouter;
